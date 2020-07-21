import React from 'react'
import {Upload, Icon, message,Modal} from "antd";
import config from '../../common/config'
import  "./imgListUpload.less";
function beforeUpload(file) {
    // const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
    // if (!isJPG) {
    //     message.error('只能上传就jpg和png文件!');
    // }
    // const isLt2M = file.size / 1024 / 1024 > 2;
    // if (isLt2M) {
    //     message.error('图片大小不可大于2MB!');
    // }
    // return isJPG && !isLt2M;
}


export default class
FileUpload extends React.Component{
    constructor(){
        super()
        this.state = {
            loading: false,
            previewVisible:false,
            length:3,
            imgCropWidth:5,
            // imgCropHeight:3,
            imgCropHeight:1,
            disabled:true,
            fileList:[]
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    componentDidMount() {
        console.log(this.props.img)
        if(this.props.img){
            let arr = [];
            this.props.img.map((item)=>{
                arr.push({status:"done",url:item,uid:item,name:"img.png"})

            })
            this.setState({
                fileList: arr,
                length: this.props.length,
                imgCropWidth:this.props.imgCropWidth,
                imgCropHeight:this.props.imgCropHeight,
                disabled:this.props.disabled
            })
        }


    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps,'dessertImgPathList')

        if(nextProps.img){
            console.log(nextProps,'dessertImgPathList')
            let imgU = {status:"done",url:nextProps.img,uid:nextProps.img,name:"img.png"};
            let arr = [];
            nextProps.img.map((item)=>{
                arr.push({status:"done",url:item,uid:item,name:"img.png"})

            })
            this.setState({
                fileList: arr
            })
        }
        if(nextProps.imgIsNull && ! nextProps.img){
            this.setState({
                fileList: []

            })
        }
    }

    handleImgChange = ({file,fileList}) => {
        this.setState({fileList})

       if(file.status ==='done'){
           this.props.handleChangeImg(file.response.result,this.props.index);
           console.log('done')
       }
       console.log('chage')
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        console.log(file)

        if (file ) {
            this.setState({
                previewImage: file.url ,
                previewVisible: true,
            });
        }


    };
    handleRemove=(file)=>{
        console.log(file)
        let fileList = this.state.fileList
        fileList.map((item,index)=>{
            if(item.url == file.url){
                this.props.removeImg(index)
            }
        })


    }

    render(){
        const {fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return(
            <div>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={fileList}
                    action={`${config.domain}api/common/upload`}
                    onChange={this.handleImgChange}
                    onPreview={this.handlePreview}
                    onRemove={this.handleRemove}
                >
                    {this.state.fileList.length >= this.props.length ? null : uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        )
    }
}
