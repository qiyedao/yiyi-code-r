import React from 'react'

import {
  Row,
  Col,
  Form,
  Button,
  Icon
} from "antd";

import  "./folderButtonSection.less";
import "../../../style/less/console.less"

class folderButtonSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      folder: false
    }
  }

  handleChangeFolderState = () => {
    this.setState({
      folder: !this.state.folder
    })
  }

  render() {
    return (
      <div>
        <Row type="flex" justify='space-between'  style={{ marginBottom: "10px" }}>
          <Col >
            <Button type="primary" onClick={this.handleChangeFolderState}>
              筛选条件 <Icon type={this.state.folder ? 'right' : 'down'} />
            </Button>
          </Col>
          <Col>
            {this.props.rightTools}
          </Col>
        </Row>
        {/* // todo fix 更好看的方式 className="filterSection"*/}
        <section  style={{ display: this.state.folder ? 'none' : 'block',marginTop: "20px"}}>
          {this.props.section}
          <Row type="flex" justify="start" >
            <Form.Item>
              <Button type="primary" style={{ marginRight: "10px" }} onClick={this.props.handleRefreshThisPage}>
                查询 <Icon type="search" />
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={this.props.handleResetThisPageData}>
                重置 <Icon type="undo" />
              </Button>
            </Form.Item>
          </Row>
        </section>
      </div>
    )
  }
}

export default folderButtonSection;