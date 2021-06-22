import Torrent from './Torrent.js'

const TorrentList = props => {
  return props.torrents.map((torrent, index) =>
    <Torrent torrent={torrent} key={index} onUpdate={props.onUpdate} onSelectedTorrent={props.onSelectedTorrent} />
  )
}

export default TorrentList
