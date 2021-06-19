import { Component } from 'react'

class Torrent extends Component {
  constructor (props) {
    super(props)
    this.torrent = this.props.torrent
    this.state = this.torrent

    this.torrent.on('download', this.handleUpdate.bind(this))
  }

  handleUpdate () {
    this.setState(this.torrent)
  }

  render () {
    return <div>{this.torrent.name} {this.torrent.progress} {this.torrent.length}</div>
  }
}

export default Torrent
