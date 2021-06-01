import React, { Component } from 'react'

export default class Test extends Component {
    constructor(props){
        super(props)
    }
    abc = () => {
        console.log("This is abc function");
    }
    render() {
        return (
            <div>
                <p>Hello xin chào function test</p>
            </div>
        )
    }
}
