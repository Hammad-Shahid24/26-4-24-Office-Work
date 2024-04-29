import React, { Component } from 'react'
import loading from './loading.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='center-loading'>
        <img className="my-3" height="50px" src={loading} alt="Loading..." />
      </div>
    )
  }
}
