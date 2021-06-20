const { remote } = global.require('electron')
const window = remote.getCurrentWindow()

const Navbar = element => {
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
    <nav className='navbar p-0 bg-dark-dm bg-white-lm'>
      <span className='w-full draggable pl-10 font-weight-bold'>wTorrent</span>
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
  )
}

export default Navbar
