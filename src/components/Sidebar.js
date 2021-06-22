import Button from './Button.js'
import { Component } from 'react'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = { value: 'All' }
  }

  onUpdate (state) {
    this.props.onUpdateState(state)
    this.setState({ value: state })
  }

  render () {
    return (
      <div className='sidebar bg-transparent d-flex flex-column justify-content-between py-20 bg-dark-dm bg-white-lm border-right-0'>
        <div>
          <Button class={this.state.value === 'All' && 'selected'} icon='toc' label='All' onUpdate={this.onUpdate.bind(this)} />
          <Button class={this.state.value === 'Downloading' && 'selected'} icon='arrow_downward' label='Downloading' onUpdate={this.onUpdate.bind(this)} />
          <Button class={this.state.value === 'Seeding' && 'selected'} icon='arrow_upward' label='Seeding' onUpdate={this.onUpdate.bind(this)} />
          <Button class={this.state.value === 'Completed' && 'selected'} icon='done' label='Completed' onUpdate={this.onUpdate.bind(this)} />
          <Button class={this.state.value === 'Paused' && 'selected'} icon='pause' label='Paused' onUpdate={this.onUpdate.bind(this)} />
        </div>
        <div>
          <Button icon='add' label='Add Torrent' class='text-primary' onUpdate={() => {}} />
          <Button icon='tune' label='Settings' onUpdate={() => {}} />
        </div>
      </div>
    )
  }
}

export default Sidebar
