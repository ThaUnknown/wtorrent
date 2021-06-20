import { Component } from 'react'

class Torrent extends Component {
  constructor (props) {
    super(props)
    this.torrent = this.props.torrent
    this.state = this.torrent
    this.units = [' B', ' kB', ' MB', ' GB', ' TB']

    window.requestAnimationFrame(this.handleUpdate.bind(this))
  }

  handleUpdate () {
    this.setState(this.torrent)
    setTimeout(() => window.requestAnimationFrame(this.handleUpdate.bind(this)), 250)
  }

  get torrentStatus () {
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
      default:
        return 'muted'
    }
  }

  get speedElem () {
    if (this.torrentStatus === 'seeding' && this.torrent.uploadSpeed !== 0) {
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

  get progressElemColor () {
    if (this.torrent.done) return 'bg-success'
    if (this.torrent.paused) return 'bg-secondary'
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
          <button className='btn btn-square btn-link material-icons' type='button'>
            more_horiz
          </button>
        </h2>
        <div className='d-flex flex-row align-items-center torrent-stats font-size-12'>
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
