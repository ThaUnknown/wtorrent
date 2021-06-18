import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import 'halfmoon/css/halfmoon-variables.min.css'
import 'halfmoon'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { ipcRenderer } from 'electron'

let webTorrent = null
ipcRenderer.on('client', client => {
  webTorrent = client
  console.log(client)
})
ReactDOM.render(
  <React.StrictMode>
    <App className='with-custom-webkit-scrollbars with-custom-css-scrollbars' data-dm-shortcut-enabled='true' data-set-preferred-mode-onload='true' webTorrent={webTorrent} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
