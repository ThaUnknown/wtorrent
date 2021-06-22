import { Component } from 'react'
import { Tabination, Tab, Page } from './Tabination'

class TorrentInfo extends Component {
  constructor (props) {
    super(props)
    this.state = props.selected
    setInterval(this.updateState.bind(this), 200)
  }

  updateState () {
    this.setState(this.props.selected)
  }

  render () {
    if (this.props.selected) {
      console.log(this.props.selected)
      return (
        <div className='h-250'>
          <Tabination def='Stats'>
            <div className='d-flex flex-column h-full'>
              <div className='d-flex flex-row px-20 pt-5'>
                <Tab id='Stats'>
                  Stats
                </Tab>
                <Tab id='Files'>
                  Files
                </Tab>
                <Tab id='Peers'>
                  Peers
                </Tab>
                <div onClick={() => this.props.onSelectedTorrent(null)} className='pointer px-10 py-5 mx-5 ml-auto sidebar-link bg-dark-dm bg-white-lm'>
                  Close
                </div>
              </div>
              <div className='bg-dark-dm bg-white-lm h-full'>
                <Page id='Stats'>
                  <div className='content'>
                    {this.props.selected.downloadSpeed}
                  </div>
                </Page>
                <Page id='Files'>
                  <div className='content'>
                    test
                  </div>
                </Page>
                <Page id='Peers'>
                  <div className='content d-flex flex-column'>
                    {this.props.selected.wires.sort((a, b) => a.peerId > b.peerId ? 1 : -1).map(wire => <div key={wire.peerId}>{wire.remoteAddress || wire.type}</div>)}
                  </div>
                </Page>
              </div>
            </div>
          </Tabination>
        </div>
      )
    }
    return null
  }
}

export default TorrentInfo
