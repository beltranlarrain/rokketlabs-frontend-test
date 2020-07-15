import React from 'react'

const categories = (props) => {
  return (
    <select onChange={props.action}>
      {props.data.map(data => <option key={data.value} value={data.value}>{data.value}</option>)}
    </select>
  )
}

export default categories
