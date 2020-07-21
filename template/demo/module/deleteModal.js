import React from 'react'
import { Form,Modal } from 'antd'
import { inject, observer } from 'mobx-react'

const ModuleConfig = require('../../moduleConfig.json')
const FlagConfig = require('../flag.json')

@inject(FlagConfig.store)
@observer
class DeleteModal extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        return <div>
            <Modal 
            visible={this.props[FlagConfig.store].showDelete}
            onCancel={()=>{
                this.props[FlagConfig.store].showDelete = false
            }}
            onOk={()=>{
                this.props[FlagConfig.store].handleDeleteData()
            }}
            >

            </Modal>
        </div>
    }
}
export default Form.create()(DeleteModal);