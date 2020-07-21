'use strict';
import    React from "react";

import { Upload, Icon, Modal,message, Row, Col } from "antd";

import "antd/dist/antd.css";
import styles from "./index.less";

import config from '../../common/config';

class ShowOrEditUpload extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      onSelectPictureAction: config.domain + "api/common/upload",
      disbaled:false,
      // filelist file 格式
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
      fileList: [],
      imgitem: '',
      // 预览
      previewImage: "",
      modalPreviewVisible: false
    };
  }
  componentDidMount() {
      console.log(this.props.imgitem+"ig")
      let imgitem = this.props.imgitem;
      console.log("图片",imgitem)

      if (imgitem !== "" && imgitem !== null&&imgitem!==undefined) {
          let obj = {};
          obj.url = imgitem;
          obj.uid = '0';
          obj.name = '图片.png';
          obj.status = 'done';
          this.setState({ fileList: [obj] });
      } else { // 否则就说明需要清空
          this.setState({ fileList: [] });
      }
  }

  componentWillReceiveProps(nextProps) {
    console.log(`- componentWillReceiveProps: ${nextProps.imgitem}`)
    // todo logic fix
    let imgitem  = nextProps.imgitem;
      console.log("图片",imgitem)
    if (imgitem !== "" && imgitem !== null&&imgitem!==undefined) {
      let obj = {};
      obj.url = imgitem;
      obj.uid = '0';
      obj.name = '图片.png';
      obj.status = 'done';
      this.setState({
          fileList: [obj] });
    } else { // 否则就说明需要清空
      this.setState({ fileList: [] });
    }
  }


  // 预览图片
  handlePreviewPicture = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      modalPreviewVisible: true
    });
  };
  // 关闭预览
  handleCancelModal = () => this.setState({ modalPreviewVisible: false });

  // 删除上传的图片
  handleRemovePicture = file => {
    this.setState({
      fileList: []
    });
    console.log(!this.props.deleteUploadUrl)
    console.log("delete--------")
    if(this.props.deleteUploadUrl){
      this.props.deleteUploadUrl();
    }

    return true;
  };
  // 编辑图片，即上传图片
  handleChangePicture = ({ file, fileList, event }) => {
    console.log(fileList)
    this.setState({
      fileList: [...fileList]
    });

    if (file.status === 'done') {
      // console.log(file.response)
      this.props.setUploadPartUrl(file.response);
    }

  };
  // getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    if (!(isJPG || isPNG)) {
      message.error("只能上传JPEG或者PNG！");
    }
      const isLt2M = file.size / 1024 / 1024 <3 ;
      if (!isLt2M) {
          message.error("图片大小不能超过3MB!");
          this.state.fileList.pop()
          console.log("1")

      }
    return isLt2M&&(isJPG || isPNG);
  };

  // 渲染组件
  render() {
    const {
      onSelectPictureAction,
      fileList,
      modalPreviewVisible,
      previewImage
    } = this.state;

    const { label } = this.props;
    console.log(fileList.length)


    return (
      <Row type="flex" justify="start" style={{ paddingBottom: '10px' }}>
        <Col>{label}</Col>
        <Col>
          <Upload
            className={styles.uploadInrow}
            action={onSelectPictureAction}
            listType="picture-card"
           beforeUpload={this.beforeUpload}
            showUploadList={true}
            fileList={fileList}
            onPreview={this.handlePreviewPicture}
            onChange={this.handleChangePicture}
            onRemove={this.handleRemovePicture}
          >
            <div>
              <Icon type="edit" />
              <div>编辑图片</div>
            </div>
          </Upload>

          <Modal
            visible={modalPreviewVisible}
            footer={null}
            onCancel={this.handleCancelModal}
          >
            <img alt="上传图片" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default ShowOrEditUpload;
