import React, { Component } from 'react'
import Child2 from './child2'

export default class child1 extends Component {
    testChild1 = (e, name = '我是子组件1') => {
        console.log(name)
    }

    render () {
        console.log(this)
        return (
            <React.Fragment>
                <input onChange = { this.props.testChild1toParents } />
                <p>{ this.props.name }</p>
                <Child2 />
            </React.Fragment>
        )
    }
}