import '../css/App.css'
import TorrentList from './TorrentList.js'
import TorrentInfo from './TorrentInfo.js'
import Sidebar from './Sidebar.js'
import Navbar from './Navbar.js'
import { Component } from 'react'
import AddTorrent from './AddTorrent.js'
const WebTorrent = window.require('webtorrent')
const path = window.require('path')

class App extends Component {
  constructor (props) {
    super(props)
    window.client = new WebTorrent()
    window.client.add('https://webtorrent.io/torrents/tears-of-steel.torrent', { path: path.resolve('E:\\videos\\testing') }).on('done', this.onUpdate.bind(this))
    window.addEventListener('beforeunload', () => {
      window.client.destroy()
    })
    window.client.on('error', console.warn)
    this.torrents = window.client.torrents
    this.filter = null
  }

  onUpdateState (filter) {
    this.filter = filter
    this.selected = null
    this.onUpdate()
  }

  onSelectedTorrent (torrent) {
    this.selected = torrent
    this.forceUpdate()
  }

  onUpdate () {
    switch (this.filter) {
      case 'Completed':
        this.torrents = window.client.torrents.filter(torrent => torrent.done)
        break
      case 'Downloading':
        this.torrents = window.client.torrents.filter(torrent => !torrent.done)
        break
      case 'Seeding':
        this.torrents = window.client.torrents.filter(torrent => torrent.done && torrent.uploadSpeed)
        break
      case 'Paused':
        this.torrents = window.client.torrents.filter(torrent => torrent.paused)
        break
      default:
        this.torrents = window.client.torrents
        break
    }
    this.forceUpdate()
  }

  render () {
    return (
      <div>
        <AddTorrent onUpdate={this.onUpdate.bind(this)} />
        <div className='page-wrapper with-navbar with-sidebar'>
          <div className='sticky-alerts' />
          <Navbar />
          <Sidebar onUpdateState={this.onUpdateState.bind(this)} />
          <div className='content-wrapper border-top border-left d-flex flex-column justify-content-between'>
            <div className='overflow-x-auto overflow-y-scroll flex-grow-1'>
              <TorrentList torrents={this.torrents} onUpdate={this.onUpdate.bind(this)} onSelectedTorrent={this.onSelectedTorrent.bind(this)} />
            </div>
            <TorrentInfo selected={this.selected} onSelectedTorrent={this.onSelectedTorrent.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
