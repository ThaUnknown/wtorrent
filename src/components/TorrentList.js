import Torrent from './Torrent.js'

const TorrentList = element => {
  return element.torrents.map(torrent =>
    <Torrent torrent={torrent} key={torrent.infoHash} />
  )
}

export default TorrentList
