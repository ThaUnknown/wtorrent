import { Component } from 'react'

class AddTorrent extends Component {
  constructor (props) {
    super(props)
    this.value = ''
    this.torrent = null
    this.peers = []
  }

  handleFileInput (element) {
    this.value = element.target.files[0].path
    element.target.value = null
    element.target.files = null
    this.forceUpdate()
    this.handleTorrent(this.value)
  }

  handleTextInput (element) {
    this.value = element.target.value
    this.forceUpdate()
    this.handleTorrent(this.value)
  }

  handleTorrent (torrentId) {
    const addTorrent = () => {
      this.torrent = window.client.add(torrentId, { path: 'E:\\videos\\testing\\' }, torrent => {
        torrent.pause()
        this.peers = torrent._peers
        for (const id in torrent._peers) {
          torrent.removePeer(id)
        }
        console.log(torrent, this.peers)
      })
    }
    if (this.torrent) {
      for (const id in this._peers) {
        this.torrent.removePeer(id)
      }
      this.torrent.destroy({ destroyStore: true }, addTorrent())
    } else {
      addTorrent()
    }
  }

  render () {
    return (
      <div className='modal' id='modal-add' tabIndex='-1' role='dialog' data-overlay-dismissal-disabled='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content w-half'>
            <button className='close' data-dismiss='modal' type='button' aria-label='Close' onClick={() => { this.value = '' }}>
              <span aria-hidden='true'>&times;</span>
            </button>
            <h5 className='modal-title font-weight-bold'>Add Torrent</h5>
            <p>
              This is the modal content. Almost any type of content can be presented to the user here.
            </p>
            <div className='text-right mt-20'>
              <div className='input-group'>
                <input type='text' className='form-control' placeholder='File, Magnet or InfoHash' value={this.value} onInput={value => this.handleTextInput(value)} />
                <div className='input-group-append'>
                  <input type='file' className='d-none' id='torrent-file-input' onInput={value => this.handleFileInput(value)} accept='.torrent' />
                  <label htmlFor='torrent-file-input' className='btn btn-primary'>Select File</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddTorrent
