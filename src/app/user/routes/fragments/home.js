import React from 'react';
import Reflux from 'reflux';
import { Layout, Divider } from 'antd';
import './style.scss';

const { Content } = Layout;

export default class extends Reflux.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content>
        <h2>Fragments：render函数可以返回字符串和数组</h2>
        <p>吐槽：React v16 之前，在组件的 render() 方法中顶层必须包裹为单节点，因此实际组件设计和使用中总是需要注意嵌套后的层级变深，这是 React 的一个经常被人诟病的问题。</p>
        <Divider/>
        {this.test1()}
        <pre>{`
          return [
            "v16：",
            <p key="test1-1">说明一</p>,
            <p key="test1-2">说明二</p>,
            <p key="test1-3">说明三</p>
          ]
          `}</pre>
        {this.test2()}
        <pre>{`
          return (
            <React.Fragment>
              v16.2:
              <p>说明一</p>
              <p>说明二</p>
              <p>说明三</p>
            </React.Fragment>
          )
        `}</pre>
      </Content>
    )
  }

  test1() {
    return [
      "v16：",
      <p key="test1-1">说明一：render 方法可以支持返回数组</p>,
      <p key="test1-2">说明二：这样确实少了一层，但大家又继续发现代码还是不够简洁。首先 TEXT 节点需要用引号包起来，其次由于是数组，每条内容当然还需要添加逗号分隔，另外 element 上还需要手动加 key 来辅助 diff。</p>
    ]
  }

  test2() {
    return (
      <React.Fragment>
        v16.2:
        <p>说明一:提供了更直接的方法，就是Fragment</p>
        <p>说明二:Fragment 本身并不会产生真实的 DOM 节点，因此也不会导致层级嵌套增加。</p>
        <p>说明三:简写方式React.Fragment可以省略</p>
      </React.Fragment>
    )
  }
}