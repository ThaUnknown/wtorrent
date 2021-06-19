import '../css/App.css'
import 'halfmoon/css/halfmoon-variables.min.css'
import 'halfmoon'
import TorrentList from './TorrentList.js'

const { remote } = global.require('electron')
const window = remote.getCurrentWindow()
console.log(window)

const App = element => {
  function handleClose () {
    window.close()
  }
  function handleMaximize () {
    window.isMaximized() ? window.unmaximize() : window.maximize()
  }
  function handleMinimize () {
    window.minimize()
  }
  return (
    <div className='page-wrapper with-navbar'>
      <div className='sticky-alerts' />
      <nav className='navbar bg-transparent'>
        <span className='mr-auto draggable'>wTorrent</span>
        <div className='window-controls' onClick={handleMinimize}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'>
            <rect fill='currentColor' width='10' height='1' x='1' y='6' />
          </svg>
        </div>
        <div className='window-controls ml-10' onClick={handleMaximize}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'><rect width='9' height='9' x='1.5' y='1.5' fill='none' stroke='currentColor' />
          </svg>
        </div>
        <div className='window-controls ml-10' onClick={handleClose}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'>
            <polygon fill='currentColor' fillRule='evenodd' points='11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1' />
          </svg>
        </div>
      </nav>
      <div className='content-wrapper'>
        <TorrentList torrents={element.client.torrents} />
      </div>
    </div>
  )
}

export default App
