const torrentList = torrents => {
  const text = []
  for (const torrent of torrents) {
    text.push(<div>{torrent.name}</div>)
  }
  return text
}

export default torrentList
