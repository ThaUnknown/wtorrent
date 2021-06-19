import React from 'react'
import ReactDOM from 'react-dom'
import 'material-design-icons/iconfont/material-icons.css'
import 'halfmoon/css/halfmoon-variables.min.css'
import './css/index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import WebTorrent from 'webtorrent'

const client = new WebTorrent()
client.add('https://webtorrent.io/torrents/tears-of-steel.torrent', torrent => {
  console.log(torrent)
})
function toggleDarkMode () {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode')
  } else {
    document.body.classList.add('dark-mode')
  }
}
document.addEventListener('keydown', e => {
  if (e.shiftKey && e.which === 68) {
    toggleDarkMode()
    e.preventDefault()
  }
})

document.body.classList.add('with-custom-webkit-scrollbars', 'dark-mode')
document.body.setAttribute('data-dm-shortcut-enabled', 1)
ReactDOM.render(
  <App client={client} />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
