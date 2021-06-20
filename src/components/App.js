import '../css/App.css'
import TorrentList from './TorrentList.js'
import Sidebar from './Sidebar.js'
import Navbar from './Navbar.js'

const App = element => {
  return (
    <div className='page-wrapper with-navbar with-sidebar'>
      <div className='sticky-alerts' />
      <Navbar />
      <Sidebar />
      <div className='content-wrapper'>
        <div className='content'>
          <TorrentList torrents={element.client.torrents} />
        </div>
      </div>
    </div>
  )
}

export default App
