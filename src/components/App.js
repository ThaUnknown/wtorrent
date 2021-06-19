import '../css/App.css'
import TorrentList from './TorrentList.js'

const { remote } = global.require('electron')
const window = remote.getCurrentWindow()

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
    <div className='page-wrapper with-navbar with-sidebar'>
      <div className='sticky-alerts' />
      <div className='sidebar bg-transparent d-flex flex-column justify-content-between py-20 px-5'>
        <div>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span className='material-icons font-size-20'>
                toc
              </span>
            </span>
            All
          </a>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span className='material-icons font-size-20'>
                arrow_downward
              </span>
            </span>
            Downloading
          </a>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span class='material-icons font-size-20'>
                arrow_upward
              </span>
            </span>
            Seeding
          </a>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span class='material-icons font-size-20'>
                done
              </span>
            </span>
            Completed
          </a>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span class='material-icons font-size-20'>
                pause
              </span>
            </span>
            Paused
          </a>
        </div>
        <div>
          <a href='#' className='sidebar-link sidebar-link-with-icon text-primary font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5 text-primary'>
              <span class='material-icons font-size-20'>
                add
              </span>
            </span>
            Add Torrent
          </a>
          <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
            <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
              <span class='material-icons font-size-20'>
                tune
              </span>
            </span>
            Settings
          </a>
        </div>
      </div>
      <nav className='navbar bg-transparent p-0'>
        <span className='w-full draggable'>wTorrent</span>
        <div className='window-controls min' onClick={handleMinimize}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'>
            <rect fill='currentColor' width='10' height='1' x='1' y='6' />
          </svg>
        </div>
        <div className='window-controls max' onClick={handleMaximize}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'><rect width='9' height='9' x='1.5' y='1.5' fill='none' stroke='currentColor' />
          </svg>
        </div>
        <div className='window-controls close' onClick={handleClose}>
          <svg width='1rem' height='1rem' viewBox='0 0 12 12'>
            <polygon fill='currentColor' fillRule='evenodd' points='11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1' />
          </svg>
        </div>
      </nav>
      <div className='content-wrapper'>
        <div className='content'>
          <TorrentList torrents={element.client.torrents} />
        </div>
      </div>
    </div>
  )
}

export default App
