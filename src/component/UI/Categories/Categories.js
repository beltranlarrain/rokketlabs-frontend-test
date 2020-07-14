import React, { Component } from 'react'

class Categories extends Component {

  render() {
    return (
      <select onChange={this.props.action}>
        {this.props.data.map(data => <option key={data.value} value={data.value}>{data.value}</option>)}
      </select>
    )
  }
}

export default Categories
