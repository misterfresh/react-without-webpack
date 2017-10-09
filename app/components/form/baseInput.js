import React, { PureComponent } from 'react'
import { css } from 'aphrodite'
import debounce from 'lodash.debounce'

import capitalize from 'utils/capitalize'

class BaseInput extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateText = debounce(this.updateText.bind(this), 500)
    let { value } = this.props
    this.state = { value }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  handleChange(event) {
    let e = Object.assign({}, { target: event.target })
    this.setState(
      {
        value: e.target.value
      },
      () => this.updateText(e)
    )
  }

  updateText(e) {
    this.props.onChange(
      e.target.dataset.property,
      this.props.type === 'number' ? parseInt(e.target.value) : e.target.value
    )
  }

  render() {
    let {
      className = '',
      style = {},
      name = '',
      type = 'text',
      placeholder = '',
      Component = 'input',
      property = '',
      min = 0,
      step = 1
    } = this.props
    let { value } = this.state
    return (
      <Component
        value={value}
        onChange={this.handleChange}
        style={style}
        className={className}
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : capitalize(name)}
        data-property={property ? property : name}
        min={min}
        step={step}
      />
    )
  }
}

export default BaseInput
