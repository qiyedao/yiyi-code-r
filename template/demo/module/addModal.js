import React from 'react'
import { Form,Modal } from 'antd'
import { inject, observer } from 'mobx-react'

const ModuleConfig = require('../../moduleConfig.json')
const FlagConfig = require('../flag.json')

@inject(FlagConfig.store)
@observer
class AddModal extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return <div>
            <Modal 
            visible={this.props[FlagConfig.store].showAdd}
            onCancel={()=>{
                this.props[FlagConfig.store].showAdd = false
            }}
            onOk={()=>{
                this.props[FlagConfig.store].handleAddData(this.props.form)
            }}
            >

            </Modal>
        </div>
    }
}
export default Form.create()(AddModal);