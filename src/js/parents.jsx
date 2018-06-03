import React, { Component } from 'react'
import Child1 from './child1'
import TestCommon from './testCommon'

export default class Parents extends Component {

    constructor (props) {
        super(props)
        this.state = {
            name: '父组件传递给子组件的值',
            showOnce: true
        }
    }

    testParents = (e, name='我是父组件') => {
        console.log(name)
    }

    testChild1toParents = (e) => {
        console.log(`这是子组件传给父组件的值： ${e.target.value}`)
        this.setState({name: e.target.value})
    }
    /**
     *  调用setState不会立即生效，在下一个轮询新的state才会生效，如果要立刻state生效，在setState
     *  方法第二个参数加一个回调函数
     * 
     * @returns 
     * @memberof Parents
     */
    render () {
        if (this.state.showOnce) {
            console.log(this.state.name)
            this.setState({
                name: 'setState方法不会让state立刻更新，必须等待下一轮轮询',
                showOnce: false
            })
            console.log(this.state.name)
        }
        
        return (
            <React.Fragment>
                <p 
                    className = 'test'
                    onClick = {this.testParents}>我是父组件</p>
                <Child1 testChild1toParents = {this.testChild1toParents} {...this.state}/>
            </React.Fragment> 
        )
    }
}

