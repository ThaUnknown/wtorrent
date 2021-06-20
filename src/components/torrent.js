import { Component } from 'react'

class Torrent extends Component {
  constructor (props) {
    super(props)
    this.torrent = this.props.torrent
    this.state = this.torrent
    this.units = [' B', ' kB', ' MB', ' GB', ' TB']

    this.torrent.on('download', this.handleUpdate.bind(this))
    this.torrent.on('upload', this.handleUpdate.bind(this))
    this.torrent.on('done', this.handleUpdate.bind(this))
  }

  handleUpdate () {
    this.setState(this.torrent)
  }

  get torrentStatus () {
    if (this.torrent.paused) {
      if (this.torrent.done) return 'completed'
      return 'paused'
    }
    if (this.torrent.done) return 'seeding'
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
    }
  }

  get torrentSpeed () {
    if (this.torrentStatus === 'seeding') return this.torrent.uploadSpeed
    if (this.torrentStatus === 'downloading') return this.torrent.downloadSpeed
  }

  fastPrettyBytes (num) {
    if (num < 1) return num + ' B'
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), this.units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    return num + this.units[exponent]
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
      <div className='card bg-dark-dm bg-white-lm torrent'>
        <h2 className='card-title font-weight-bold d-flex flex-row justify-content-between'>
          <div>
            {this.torrent.name}
          </div>
          <button class='btn btn-square btn-link material-icons' type='button'>
            more_horiz
          </button>
        </h2>
        <div className='d-flex flex-row align-items-center torrent-stats'>
          <div class='material-icons font-size-20 pr-5 text-muted'>
            {this.statusIcon}
          </div>
          <span className='text-muted'>
            {this.fastPrettyBytes(this.torrentSpeed)}/s
          </span>
          <span className='text-muted'>
            {parseInt(this.torrent.progress * 100)}%
          </span>
          <span className='text-muted'>
            {this.fastPrettyBytes(this.torrent.received)} of {this.fastPrettyBytes(this.torrent.length)}
          </span>
          <span className='text-muted'>
            {this.fastToTS(parseInt(this.torrent.timeRemaining / 1000))} remaining
          </span>
        </div>
      </div>
    )
  }
}

export default Torrent
