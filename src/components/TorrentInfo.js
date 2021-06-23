import { Component } from 'react'
import { Tabination, Tab, Page } from './Tabination'
import { fastPrettyBytes, fastToTS } from './Util.js'

class TorrentInfo extends Component {
  constructor (props) {
    super(props)
    this.state = props.selected
    setInterval(this.updateState.bind(this), 200)
  }

  updateState () {
    this.setState(this.props.selected)
  }

  Stats (props) {
    return (
      <div className='content my-5 d-flex flex-column'>
        <div>
          <span>Upload Speed </span>
          <span>{fastPrettyBytes(props.torrent.UploadSpeed)}/s</span>
        </div>
        <div>
          <span>Uploaded </span>
          <span>{fastPrettyBytes(props.torrent.uploaded)}</span>
        </div>
        <div>
          <span>Download Speed </span>
          <span>{fastPrettyBytes(props.torrent.downloadSpeed)}/s</span>
        </div>
        <div>
          <span>Downloaded </span>
          <span>{fastPrettyBytes(props.torrent.downloaded)}</span>
        </div>
        <div>
          <span>Peers </span>
          <span>{props.torrent.numPeers}</span>
        </div>
        <div>
          <span>Files </span>
          <span>{props.torrent.files.length}</span>
        </div>
        <div>
          <span>Ratio </span>
          <span>{props.torrent.ratio}</span>
        </div>
        <div>
          <span>Time Remaining </span>
          <span>{fastToTS(parseInt(props.torrent.timeRemaining / 1000))}</span>
        </div>
      </div>
    )
  }

  Files (props) {
    return (
      <div className='content my-5'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Filesize</th>
              <th>Downloaded</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {props.torrent.files.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{fastPrettyBytes(file.length)}</td>
                  <td>{fastPrettyBytes(file.downloaded)}</td>
                  <td>{parseInt(file.progress * 100)}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  Peers (props) {
    return (
      <div className='content my-5'>
        <table className='table'>
          <thead>
            <tr>
              <th>Address</th>
              <th>Type</th>
              <th>Up</th>
              <th>Speed</th>
              <th>Down</th>
              <th>Speed</th>
              <th>Ratio</th>
              <th>Destroy</th>
            </tr>
          </thead>
          <tbody>
            {props.torrent.wires.sort((a, b) => a.peerId > b.peerId ? 1 : -1).map((wire, index) => {
              return (
                <tr key={index}>
                  <td>{wire.remoteAddress || wire.type}</td>
                  <td>{wire.type}</td>
                  <td>{fastPrettyBytes(wire.uploaded)}</td>
                  <td>{fastPrettyBytes(wire.uploadSpeed())}/s</td>
                  <td>{fastPrettyBytes(wire.downloaded)}</td>
                  <td>{fastPrettyBytes(wire.downloadSpeed())}/s</td>
                  <td>{((wire.downloaded / (wire.uploaded || 1)) / props.torrent.length).toFixed(2)}</td>
                  <td className='text-danger pointer material-icons w-50' onClick={() => wire.destroy()}>link_off</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    if (this.props.selected) {
      return (
        <div className='h-half'>
          <Tabination>
            <div className='d-flex flex-column h-full'>
              <div className='d-flex flex-row px-20 pt-5'>
                <Tab id='Stats'>
                  Stats
                </Tab>
                <Tab id='Files'>
                  Files
                </Tab>
                <Tab id='Peers'>
                  Peers
                </Tab>
                <div onClick={() => this.props.onSelectedTorrent(null)} className='pointer px-10 py-5 mx-5 ml-auto sidebar-link bg-dark-dm bg-white-lm'>
                  Close
                </div>
              </div>
              <div className='bg-dark-dm bg-white-lm h-full overflow-y-scroll'>
                <Page id='Stats'>
                  <this.Stats torrent={this.props.selected} />
                </Page>
                <Page id='Files'>
                  <this.Files torrent={this.props.selected} />
                </Page>
                <Page id='Peers'>
                  <this.Peers torrent={this.props.selected} />
                </Page>
              </div>
            </div>
          </Tabination>
        </div>
      )
    }
    return null
  }
}

export default TorrentInfo
