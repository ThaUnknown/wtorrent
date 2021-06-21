import React from 'react'
import ReactDOM from 'react-dom'
import 'material-design-icons/iconfont/material-icons.css'
import 'halfmoon/css/halfmoon-variables.min.css'
import halfmoon from 'halfmoon/js/halfmoon-module'
import './css/index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

function toggleDarkMode () {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode')
  } else {
    document.body.classList.add('dark-mode')
  }
}
function toggleGlass () {
  if (document.body.classList.contains('glassmorph')) {
    document.body.classList.remove('glassmorph')
  } else {
    document.body.classList.add('glassmorph')
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'D') {
    toggleDarkMode()
    e.preventDefault()
  } else if (e.key === 'G') {
    toggleGlass()
    e.preventDefault()
  }
})

document.body.classList.add('with-custom-webkit-scrollbars', 'dark-mode', 'glassmorph')
ReactDOM.render(
  <App />,
  document.body
)
halfmoon.onDOMContentLoaded()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
