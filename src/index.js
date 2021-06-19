import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import 'halfmoon/css/halfmoon-variables.min.css'
import 'halfmoon'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import WebTorrent from 'webtorrent'

const client = new WebTorrent()
client.add('magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent', torrent => {
  console.log(torrent)
})
ReactDOM.render(
  <App className='with-custom-webkit-scrollbars with-custom-css-scrollbars' data-dm-shortcut-enabled='true' data-set-preferred-mode-onload='true' client={client} />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
