import { Component } from 'react'
import { Tabination, Tab, Page } from './Tabination'
import { fastPrettyBytes } from './Util.js'

class AddTorrent extends Component {
  constructor (props) {
    super(props)
    this.value = ''
    this.torrent = null
    this.peers = []
    this.files = []
    this.trackers = []
    this.state = null
    this.storedTracker = null
    this.hide = false
    this.createTorrent = {
      announceList: [],
      comment: 'Created With wTorrent',
      createdBy: 'wTorrent'
    }
  }

  handleClose (success) {
    if (!success) this.torrent.destroy({ destroyStore: true })
    this.value = ''
    this.torrent = null
    this.peers = []
    this.files = []
    this.trackers = []
    this.hide = false
    this.createTorrent = {
      announceList: [],
      comment: 'Created With wTorrent',
      createdBy: 'wTorrent'
    }
  }

  handleFileInput (element) {
    this.files = [...element.target.files]
    this.value = element.target.files.length === 1 ? element.target.files[0].path : [...element.target.files].map(file => file.path)
    element.target.value = null
    element.target.files = null
    this.updateState()
    this.handleTorrent(this.value)
  }

  handleTextInput (element) {
    this.value = element.target.value
    this.files = []
    this.updateState()
    this.handleTorrent(this.value)
  }

  handleTorrent (torrentId) {
    this.trackers = []
    const torrentRx = /(^magnet:){1}|(^[A-F\d]{8,40}$){1}|(.*\.torrent$){1}/i
    const initTorrent = () => {
      this.torrent = null
      if (torrentRx.test(torrentId)) {
        this.torrent = window.client.add(torrentId, { path: 'E:\\videos\\testing\\' }, torrent => {
          torrent.pause()
          this.peers = Object.values(torrent._peers).map(peer => ({ type: peer.type, addr: peer.addr }))
          for (const id in torrent._peers) {
            torrent.removePeer(id)
          }
          this.files = torrent.files
          this.updateState()
        })
      } else {
        this.updateState()
        // TODO: implement seeding functionality
        window.client.seed(this.files, this.createTorrent)
      }
    }
    if (this.torrent) {
      this._peers = []
      this.torrent.destroy({ destroyStore: true }, initTorrent())
    } else {
      initTorrent()
    }
  }

  handleAddTorrent () {
    if (this.torrent) {
      this.torrent.resume()
      for (const peer of this.peers) {
        if (peer.type === 'webSeed') {
          this.torrent.addWebSeed(peer.addr)
        } else if (peer.type !== 'webrtc') {
          this.torrent.addPeer(peer.addr)
        }
      }
    }
    this.handleClose(true)
    this.props.onUpdate()
  }

  updateState () {
    this.setState({
      files: this.files,
      torrent: this.torrent,
      value: this.value,
      createTorrent: this.createTorrent
    })
  }

  render () {
    return (
      <div className='modal' id='modal-add' tabIndex='-1' role='dialog' data-overlay-dismissal-disabled='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content w-three-quarter h-three-quarter d-flex flex-column justify-content-between bg-very-dark-dm bg-light-lm p-0'>
            <div className='content'>
              <button className='close' data-dismiss='modal' type='button' aria-label='Close' onClick={this.handleClose.bind(this)}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h5 className='modal-title font-weight-bold'>Add Torrent</h5>
              <div className='text-right mt-20'>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <input type='file' className='d-none' id='torrent-file-input' onInput={element => this.handleFileInput(element)} multiple />
                    <label htmlFor='torrent-file-input' className='btn btn-primary'>Select File</label>
                  </div>
                  <input type='text' className='form-control' placeholder='File, Magnet or InfoHash' value={this.value} onInput={element => this.handleTextInput(element)} />
                  <div className='input-group-append' onClick={this.handleAddTorrent.bind(this)}>
                    <button className='btn btn-success font-weight-bold' type='button' data-dismiss='modal' aria-label='Close'>Add</button>
                  </div>
                </div>
              </div>
            </div>
            {this.Details()}
          </div>
        </div>
      </div>
    )
  }

  setHide (state) {
    this.hide = state
    this.updateState()
  }

  Details () {
    return !!this.files.length && (
      <Tabination default='Information'>
        <div className={'d-flex flex-column w-full' + (!this.hide && ' h-half')}>
          <div className='d-flex flex-row px-20 pt-5'>
            <div onClick={() => this.setHide(false)} className='d-flex flex-row '>
              <Tab id='Information'>
                Information
              </Tab>
              <Tab id='Files'>
                Files
              </Tab>
              <Tab id='Trackers'>
                Trackers
              </Tab>
            </div>
            <div onClick={() => this.setHide(true)} className='ml-auto'>
              <Tab id=''>
                Hide
              </Tab>
            </div>
          </div>
          <div className={'bg-dark-dm bg-white-lm overflow-y-scroll' + (!this.hide && ' h-full')}>
            <Page id='Information'>
              {this.Information()}
            </Page>
            <Page id='Files'>
              {this.Files()}
            </Page>
            <Page id='Trackers'>
              {this.Trackers()}
            </Page>
          </div>
        </div>
      </Tabination>
    )
  }

  Information () {
    const fileSize = fastPrettyBytes(this.torrent?.length || this.files.reduce((sum, { size }) => sum + size, 0))
    return (
      <div className='content my-10'>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Name</span>
          </div>
          <input type='text' className='form-control' placeholder='Torrent Name' value={this.torrent?.name} readOnly={!!this.torrent} />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Comment</span>
          </div>
          <input type='text' className='form-control' placeholder='Created With wTorrent' value={this.torrent?.comment} readOnly={!!this.torrent} />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Author</span>
          </div>
          <input type='text' className='form-control' placeholder='wTorrent' value={this.torrent?.createdBy} readOnly={!!this.torrent} />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>File Size</span>
          </div>
          <input type='text' className='form-control' value={fileSize} readOnly />
        </div>
      </div>
    )
  }

  Trackers () {
    const trackers = this.torrent?.announce || this.createTorrent.announceList
    return (
      <div className='content my-5'>
        <div className='input-group pt-5'>
          <input type='text' className='form-control' placeholder='wss://exampletracker.xyz:port' onInput={element => this.storeTracker(element)} />
          <div className='input-group-append' onClick={this.addTracker.bind(this)}>
            <button className='btn btn-success font-weight-bold' type='button'>Add</button>
          </div>
        </div>
        <table className='table table-auto'>
          <thead>
            <tr>
              <th className='w-full'>Tracker</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {trackers.map((tracker, index) => {
              return (
                <tr key={index}>
                  <td>{tracker}</td>
                  <td className='text-danger pointer material-icons w-full text-center' onClick={() => this.deleteTracker(tracker)}>delete</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  deleteTracker (tracker) {
    if (this.torrent) {
      this.torrent.announce = this.torrent.announce.filter(item => item !== tracker)
    } else {
      this.createTorrent.announceList = this.createTorrent.announceList.filter(item => item !== tracker)
    }
    this.updateState()
  }

  storeTracker (element) {
    this.storedTracker = element.target.value
  }

  addTracker () {
    if (this.storedTracker) {
      if (this.torrent) {
        this.torrent.announce.push(this.storedTracker)
      } else {
        this.createTorrent.announceList.push(this.storedTracker)
      }
      this.updateState()
    }
  }

  Files () {
    return (
      <div className='content my-5'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Filesize</th>
              {this.torrent && <th className='w-100'>Priority</th>}
            </tr>
          </thead>
          <tbody>
            {this.files.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{(file.length && fastPrettyBytes(file.length)) || (file.size && fastPrettyBytes(file.size)) || '?'}</td>
                  {this.torrent && <td><input type='number' placeholder='0' className='form-control' onInput={value => this.setPriority(value, file)} /></td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  setPriority (value, file) {
    this.torrent.files.filter(item => item === file)[0].select(value)
  }
}

export default AddTorrent
