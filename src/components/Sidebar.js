const Sidebar = element => {
  return (
    <div className='sidebar bg-transparent d-flex flex-column justify-content-between py-20 px-5 bg-dark-dm bg-white-lm'>
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
            <span className='material-icons font-size-20'>
              arrow_upward
            </span>
          </span>
          Seeding
        </a>
        <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
          <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
            <span className='material-icons font-size-20'>
              done
            </span>
          </span>
          Completed
        </a>
        <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
          <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
            <span className='material-icons font-size-20'>
              pause
            </span>
          </span>
          Paused
        </a>
      </div>
      <div>
        <a href='#' className='sidebar-link sidebar-link-with-icon text-primary font-weight-bold'>
          <span className='sidebar-icon bg-transparent justify-content-start mr-5 text-primary'>
            <span className='material-icons font-size-20'>
              add
            </span>
          </span>
          Add Torrent
        </a>
        <a href='#' className='sidebar-link sidebar-link-with-icon font-weight-bold'>
          <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
            <span className='material-icons font-size-20'>
              tune
            </span>
          </span>
          Settings
        </a>
      </div>
    </div>

  )
}

export default Sidebar
