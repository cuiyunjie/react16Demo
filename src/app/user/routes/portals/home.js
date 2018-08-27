import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import { Layout, Divider, Button, Icon } from 'antd';
import './style.scss';

const { Content } = Layout;
const modalContainer = document.getElementById('modal-container');

export default class extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false
    }
  }

  handleModal(value, displayValue) {
    this.setState({ isShowModal: value });
    document.querySelector('#modal-container').style.display = displayValue;
  }

  render() {
    let { isShowModal } = this.state;
    return (
      <Content>
        <h2>portals(支持声明性地将子树渲染到另一个DOM节点)</h2>
        <p>吐槽：默认情况下React组件树和DOM树完全对应的，因些对于一些Modal, Overlay之类的组件通常是将它们放在顶层，但逻辑上它们可能只是属于某个子组件，不利于组件的代码组织。</p>
        <Divider/>

        <p>Portals机制提供了一种最直接的方式可以把一个子组件渲染到父组件渲染的DOM树之外。</p>

        <pre>{`
          ReactDOM.createPortal(
            child,
            container
          );
        `}</pre>
        <ul>
          <li>第一个参数child是任何可渲染的React子元素，如元素、字符串或片段。</li>
          <li>第二个参数container是一DOM元素</li>
        </ul>
        <br/>
        <Button onClick={() => this.handleModal(true, 'block')}>弹框</Button>
        {isShowModal && ReactDOM.createPortal(this.renderModal(), modalContainer)}
      </Content>
    )
  }

  renderModal() {
    return (
      <div className="modal-wrap">
        <Icon
          type="close"
          onClick={() => this.handleModal(false, 'none')}
        />
        <p>this is modal!</p>
      </div>
    )
  }
}