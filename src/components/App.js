import '../css/App.css'
import TorrentList from './TorrentList.js'

const App = element => {
  return (
    <div className='page-wrapper with-navbar'>
      <div className='sticky-alerts' />
      <nav className='navbar' />
      <div className='content-wrapper'>
        <TorrentList torrents={element.client.torrents} />
      </div>
    </div>
  )
}

export default App
