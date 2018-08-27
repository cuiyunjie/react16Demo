import React from 'react';
import Reflux from 'reflux';
import { Layout, Divider } from 'antd';
import ErrorBoundary from 'components/error-boundary';
import ErrorDemo from 'components/error-demo';
import './style.scss';

const { Content } = Layout;

export default class extends Reflux.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <h2>error boundaries（处理错误）</h2>
        <p>吐槽：React v16 之前，如果渲染中出现错误，整个页面会直接崩掉</p>
        <Divider/>
        <ErrorBoundary>
          <ErrorDemo />
        </ErrorBoundary>
        <ul>
          <li>在组件上定义新的生命周期钩子componentDidCatch方法的方式来创建一个有错误捕捉功能的组件，在其内嵌的组件在生命过程中发生的错误都会被其捕捉到，而不会上升到外部导致整个页面和组件树异常。</li>
          <li>就像 try catch 一样，可用于捕获 render 过程中的错误，常用于捕获错误并渲染不同的页面，避免整个页面崩溃。</li>
          <li>错误边界只能捕捉生命周期中的错误(willMount/render等方法内)，无法捕捉异步的、事件回调中的错误，要捕捉和覆盖所有场景依然需要配合window.onerror、Promise.catch、try/catch等方式</li>
        </ul>
        <p>重点在 componentDidCatch 这一句，如果捕获错误了把当前state.hasError设为true，render里判断下是否有错误再渲染，可以做到备用页面的显示，这也是常用的 componentDidCatch 处理手法，可以作为经典范例。</p>
        <p>componentDidCatch可以接受两个参数: 抛出的错误error 和 错误信息的 info，现在的info只包含了调用栈的信息，感觉用处不大，因为发生错误时React总是会打印堆栈。</p>
        <ErrorBoundary>
          <ErrorDemo />
        </ErrorBoundary>
        <pre>{`
          export default class extends Component {
            constructor(props) {
              super(props);
              this.state = {
                hasError: false,
                errorInfo: null
              }
            }

            componentDidCatch(err, {componentStack}) {
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
                  <div>
                    <h1>报错了....</h1>
                    <p>{this.state.errorInfo}</p>
                  </div>
                )
              }
            }
        `}</pre>
      </Content>
    )
  }
}