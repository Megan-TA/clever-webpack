import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Parents from './parents'
 
import Styles from '../css/styles'



function render () {
    ReactDOM
        .render(
            <Parents />, 
            document.getElementById('root')
        )
}

setTimeout(() => {
    render()
}, 0)
