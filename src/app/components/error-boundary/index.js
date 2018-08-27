import React, { Component } from 'react';
import './style.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null
    }
  }

  componentDidCatch(err, {componentStack}) { console.log(componentStack);
    this.setState({
      hasError: err,
      errorInfo: componentStack
    });
  }

  render() {
    return (
      this.state.hasError ? this.renderError() : this.props.children
    )
  }

  renderError() {
    return (
      <div className="error-info-wrap">
        <h1>报错了....</h1>
        <p>{this.state.errorInfo}</p>
      </div>
    )
  }
}
