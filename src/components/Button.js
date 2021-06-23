import { Component } from 'react'

class Button extends Component {
  render () {
    return (
      <span className={'sidebar-link sidebar-link-with-icon font-weight-bold pointer ' + this.props.class || ''} onClick={() => this.props.onUpdate && this.props.onUpdate(this.props.label)} {...this.props.other}>
        <span className='sidebar-icon bg-transparent justify-content-start mr-5'>
          <span className={'material-icons font-size-20 ' + this.props.class || ''}>
            {this.props.icon}
          </span>
        </span>
        {this.props.label}
      </span>
    )
  }
}

export default Button
