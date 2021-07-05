import { Component } from 'react'
import { Tabination, Tab, Page } from './Tabination'
import { fastPrettyBytes } from './Util.js'

class AddTorrent extends Component {
  constructor (props) {
    super(props)
    this.peers = []
    this.torrent = null
    this.baseState = {
      value: '',
      tracker: '',
      files: [],
      createTorrent: {
        announceList: [],
        comment: 'Created With wTorrent',
        createdBy: 'wTorrent',
        name: ''
      },
      hide: false
    }
    this.state = this.baseState
  }

  handleClose (success) {
    if (!(success === true)) this.torrent?.destroy({ destroyStore: true })
    this.setState(this.baseState)
  }

  handleFileInput (element) {
    this.setState({ files: [...element.target.files] })
    this.handleTorrent(element.target.files.length === 1 ? element.target.files[0].path : [...element.target.files].map(file => file.path))
    element.target.value = null
    element.target.files = null
  }

  handleTextInput (element) {
    this.handleTorrent(element.target.value)
  }

  handleTorrent (filePath) {
    const torrentRx = /(^magnet:){1}|(^[A-F\d]{8,40}$){1}|(.*\.torrent$){1}/i
    const initTorrent = () => {
      if (torrentRx.test(filePath)) {
        this.torrent = window.client.add(filePath, { path: 'E:\\videos\\testing' }, torrent => {
          if (this.torrent) {
            torrent.pause()
            this.peers = Object.values(torrent._peers).map(peer => ({ type: peer.type, addr: peer.addr }))
            for (const id in torrent._peers) {
              torrent.removePeer(id)
            }
            this.setState({ files: torrent.files })
          }
        })
        this.setState({
          value: filePath
        })
      } else {
        this.setState({
          value: filePath
        })
      }
    }
    if (this.torrent) {
      this.peers = []
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
    } else {
      window.client.seed(this.state.files, this.state.createTorrent)
    }
    this.handleClose(true)
    this.props.onUpdate()
  }

  handleInputChange (event) {
    this.setState({
      createTorrent: {
        ...this.state.createTorrent,
        [event.target.name]: event.target.value
      }
    })
  }

  deleteTracker (tracker) {
    if (this.torrent) {
      this.torrent.announce = this.torrent.announce.filter(item => item !== tracker)
    } else {
      this.setState({
        createTorrent: {
          announceList: this.state.createTorrent.announceList.filter(item => item !== tracker)
        }
      })
    }
    this.forceUpdate()
  }

  addTracker () {
    if (this.state.tracker) {
      if (this.torrent) {
        this.torrent.announce.push(this.state.tracker)
      } else {
        this.state.createTorrent.announceList.push([this.state.tracker])
      }
    }
    this.forceUpdate()
  }

  storeTracker (element) {
    this.setState({ tracker: element.target.value })
  }

  setPriority (value, file) {
    this.torrent.files.filter(item => item === file)[0].select(value)
  }

  setHide (state) {
    this.setState({
      hide: state
    })
  }

  render () {
    return (
      <div className='modal' id='modal-add' tabIndex='-1' role='dialog' data-overlay-dismissal-disabled='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content w-three-quarter mh-three-quarter d-flex flex-column justify-content-between bg-very-dark-dm bg-light-lm p-0'>
            <div className='content'>
              <button className='close' data-dismiss='modal' type='button' aria-label='Close' onClick={this.handleClose.bind(this)}>
                <span aria-hidden='true'>&times;</span>
              </button>
              <h5 className='modal-title font-weight-bold'>Add Torrent</h5>
              <div className='text-right mt-20'>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <input
                      type='file'
                      className='d-none'
                      id='torrent-file-input'
                      onInput={element => this.handleFileInput(element)} multiple
                    />
                    <label htmlFor='torrent-file-input' className='btn btn-primary'>Select File</label>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='File, Magnet or InfoHash'
                    value={this.state.value}
                    onInput={element => this.handleTextInput(element)}
                  />
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

  Details () {
    return !!(this.torrent ? this.torrent.files.length : this.state.files.length) && (
      <Tabination default='Information'>
        <div className={'d-flex flex-column w-full overflow-hidden' + (!this.state.hide && ' flex-grow-1')}>
          <div className='d-flex flex-row px-20 pt-5'>
            <div onClick={() => this.setHide(false)} className='d-flex flex-row '>
              <Tab id='Information'>
                Information
              </Tab>
              <Tab id='Files'>
                Files {this.torrent.files.length && `(${this.torrent.files.length})`}
              </Tab>
              <Tab id='Trackers'>
                Trackers {this.torrent.announce.length && `(${this.torrent.announce.length})`}
              </Tab>
            </div>
            <div onClick={() => this.setHide(true)} className='ml-auto'>
              <Tab id=''>
                Hide
              </Tab>
            </div>
          </div>
          <div className={'bg-dark-dm bg-white-lm overflow-y-scroll' + (!this.state.hide && ' flex-grow-1')}>
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
    const fileSize = fastPrettyBytes(this.torrent ? this.torrent.length : this.state.files.reduce((sum, { size }) => sum + size, 0))
    return (
      <div className='content my-20'>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text w-100 flex-row-reverse'>Name</span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Torrent Name'
            value={this.torrent ? this.torrent.name : this.state.createTorrent.name}
            name='name'
            readOnly={!!this.torrent}
            onInput={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text w-100 flex-row-reverse'>Comment</span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Created With wTorrent'
            value={this.torrent ? this.torrent.comment : this.state.createTorrent.comment}
            name='comment'
            readOnly={!!this.torrent}
            onInput={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text w-100 flex-row-reverse'>Author</span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='wTorrent'
            value={this.torrent ? this.torrent.createdBy : this.state.createTorrent.createdBy}
            name='createdBy'
            readOnly={!!this.torrent}
            onInput={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='input-group my-5'>
          <div className='input-group-prepend'>
            <span className='input-group-text w-100 flex-row-reverse'>File Size</span>
          </div>
          <input
            type='text'
            className='form-control'
            value={fileSize}
            readOnly
          />
        </div>
      </div>
    )
  }

  Trackers () {
    const trackers = this.torrent?.announce || this.state.createTorrent.announceList
    return (
      <div className='content my-5'>
        <div className='input-group pt-5'>
          <input
            type='text'
            className='form-control'
            placeholder='wss://exampletracker.xyz:port'
            name='tracker'
            value={this.state.tracker}
            onInput={this.storeTracker.bind(this)}
          />
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
                  <td
                    className='text-danger pointer material-icons w-full text-center'
                    onClick={() => this.deleteTracker(tracker)}
                  >
                    delete
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
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
            {this.state.files.sort((a, b) => b.length - a.length).map((file, index) => {
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
}

export default AddTorrent
