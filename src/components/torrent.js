import { Component } from 'react'

class Torrent extends Component {
  constructor (props) {
    super(props)
    this.torrent = this.props.torrent
    this.state = this.torrent
    this.units = [' B', ' kB', ' MB', ' GB', ' TB']

    this.onUpdate = props.onUpdate
    this.oldState = null
    this.torrent.on('upload', () => {
      if (this.torrent.done && this.oldState !== 'seeding') {
        this.oldState = 'seeding'
        this.onUpdate()
      }
    })
  }

  componentDidMount () {
    window.requestAnimationFrame(this.handleUpdate.bind(this))
  }

  componentWillUnmount () {
    this.setState = () => {}
  }

  handleUpdate () {
    if (this.oldState === 'seeding' && !this.torrent.uploadSpeed) {
      this.oldState = 'completed'
      this.onUpdate()
      window.requestAnimationFrame(this.handleUpdate.bind(this))
    }
    this.setState(this.torrent)
    setTimeout(() => window.requestAnimationFrame(this.handleUpdate.bind(this)), 250)
  }

  get torrentStatus () {
    if (this.torrent.destroyed) return 'destroyed'
    if (this.torrent.paused) return 'paused'
    if (this.torrent.done) {
      if (this.torrent.numPeers === 0 || this.torrent.uploadSpeed === 0) return 'completed'
      return 'seeding'
    }
    return 'downloading'
  }

  get statusIcon () {
    switch (this.torrentStatus) {
      case 'completed':
        return 'done'
      case 'paused':
        return 'pause'
      case 'seeding':
        return 'arrow_upward'
      case 'downloading':
        return 'arrow_downward'
      case 'destroyed':
        return 'delete'
      default:
        return 'sync'
    }
  }

  get statusColor () {
    switch (this.torrentStatus) {
      case 'completed':
        return 'success'
      case 'paused':
        return 'secondary'
      case 'seeding':
        return 'success'
      case 'downloading':
        return 'primary'
      case 'destroyed':
        return 'danger'
      default:
        return 'muted'
    }
  }

  get speedElem () {
    if (this.torrentStatus === 'seeding' && this.torrent.uploadSpeed) {
      return (
        <span className='text-muted'>
          {this.fastPrettyBytes(this.torrent.uploadSpeed)}/s
        </span>
      )
    }
    if (this.torrentStatus === 'downloading') {
      return (
        <span className='text-muted'>
          {this.fastPrettyBytes(this.torrent.downloadSpeed)}/s
        </span>
      )
    }
    return null
  }

  get timeElem () {
    if (this.torrent.done) return null
    return (
      <span className='text-muted'>
        {this.fastToTS(parseInt(this.torrent.timeRemaining / 1000))} remaining
      </span>
    )
  }

  get peersElem () {
    if (!this.torrent.numPeers) return null
    return (
      <span className='text-muted'>
        {this.torrent.numPeers} Peer{this.torrent.numPeers === 1 ? '' : 's'}
      </span>
    )
  }

  get fileSizeElem () {
    if (this.torrent.done) {
      return (
        <span className='text-muted'>
          {this.fastPrettyBytes(this.torrent.length)}
        </span>
      )
    }
    return (
      <span className='text-muted'>
        {this.fastPrettyBytes(this.torrent.received)} of {this.fastPrettyBytes(this.torrent.length)}
      </span>
    )
  }

  get pauseElement () {
    if (this.torrent.paused) {
      return (
        <span className='px-10 sidebar-link sidebar-link-with-icon' onClick={this.handlePauseResume.bind(this)}>
          <span className='sidebar-icon bg-transparent justify-content-start mr-0'>
            <span className='material-icons font-size-16'>
              play_arrow
            </span>
          </span>
          Resume
        </span>
      )
    }
    return (
      <span className='px-10 sidebar-link sidebar-link-with-icon' onClick={this.handlePauseResume.bind(this)}>
        <span className='sidebar-icon bg-transparent justify-content-start mr-0'>
          <span className='material-icons font-size-16'>
            pause
          </span>
        </span>
        Pause
      </span>
    )
  }

  handlePauseResume () {
    if (this.torrent.paused) {
      this.torrent.resume()
    } else {
      this.torrent.pause()
    }
    this.onUpdate()
  }

  handleRemove () {
    this.torrent.destroy(() => {
      this.onUpdate()
    })
  }

  handleDelete () {
    this.torrent.destroy({ destroyStore: true }, () => {
      this.onUpdate()
    })
  }

  get progressElemColor () {
    if (this.torrent.destroyed) return 'bg-danger'
    if (this.torrent.paused) return 'bg-secondary'
    if (this.torrent.done) return 'bg-success'
    return 'bg-primary'
  }

  fastPrettyBytes (num) {
    if (isNaN(num)) return '0 B'
    if (num < 1) return num + ' B'
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), this.units.length - 1)
    return Number((num / Math.pow(1000, exponent)).toFixed(2)) + this.units[exponent]
  }

  fastToTS (sec, full) {
    if (isNaN(sec) || sec < 0) {
      return full ? '0:00:00.00' : '00:00'
    }
    const hours = Math.floor(sec / 3600)
    let minutes = Math.floor(sec / 60) - (hours * 60)
    let seconds = full ? (sec % 60).toFixed(2) : Math.floor(sec % 60)
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return (hours > 0 || full) ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds
  }

  render () {
    return (
      <div className='card bg-dark-dm bg-white-lm position-relative'>
        <h2 className='card-title font-weight-bold d-flex flex-row justify-content-between'>
          <div>
            {this.torrent.name}
          </div>
          <div className='dropdown'>
            <button className={'btn btn-square btn-link material-icons shadow-none text-' + this.statusColor} data-toggle='dropdown' type='button' id={'more-' + this.torrent.infoHash} aria-haspopup='true' aria-expanded='false'>
              more_horiz
            </button>
            <div className='dropdown-menu dropdown-menu-right bg-dark-dm bg-white-lm border font-weight-normal pointer font-size-12' aria-labelledby={'more-' + this.torrent.infoHash}>
              {this.pauseElement}
              <span className='px-10 sidebar-link sidebar-link-with-icon' onClick={this.handleRemove.bind(this)}>
                <span className='sidebar-icon bg-transparent justify-content-start mr-0'>
                  <span className='material-icons font-size-16'>
                    remove
                  </span>
                </span>
                Remove
              </span>
              <span className='px-10 sidebar-link sidebar-link-with-icon' onClick={this.handleDelete.bind(this)}>
                <span className='sidebar-icon bg-transparent justify-content-start mr-0'>
                  <span className='material-icons font-size-16'>
                    delete
                  </span>
                </span>
                Remove with files
              </span>
              <span className='px-10 sidebar-link sidebar-link-with-icon'>
                <span className='sidebar-icon bg-transparent justify-content-start mr-0'>
                  <span className='material-icons font-size-16'>
                    info
                  </span>
                </span>
                More information
              </span>
            </div>
          </div>
        </h2>
        <div className='d-flex flex-row align-items-center flex-wrap torrent-stats font-size-12'>
          <div className={'material-icons pr-5 text-' + this.statusColor}>
            {this.statusIcon}
          </div>
          <span className='text-muted'>
            {parseInt(this.torrent.progress * 100)}%
          </span>
          {this.fileSizeElem}
          {this.speedElem}
          {this.peersElem}
          {this.timeElem}
        </div>
        <div className={this.progressElemColor + ' position-absolute bottom-0 left-0'} style={{ width: this.torrent.progress * 100 + '%', height: '1px' }} />
      </div>
    )
  }
}

export default Torrent
