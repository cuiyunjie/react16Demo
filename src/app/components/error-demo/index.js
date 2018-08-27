import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }))
  }

  render() {
    let { counter } = this.state;
    if(counter === 5) {
      throw new Error('我出错了~~~');
    }

    return (
      <a onClick={this.handleClick}>点击我会增加<span className="">{counter}</span>不能超过4哟</a>
    )
  }
}
