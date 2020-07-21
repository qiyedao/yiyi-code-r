import React from 'react'
import { Form, Table, Button } from 'antd'
import { inject, observer } from 'mobx-react'
import EditModal from './editModal'
import AddModal from './addModal'
import DeleteModal from './deleteModal'

const ModuleConfig = require('../../moduleConfig.json')
const FlagConfig = require('../flag.json')

@inject(FlagConfig.store)
@observer
class Index extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props[FlagConfig.store].handleGetData()
    }
    render(){
       
        let tableColums = []
        let tempColums = ModuleConfig.module[FlagConfig.key].tableColums
        tempColums.map((item)=>{
            tableColums.push({
                title:item.title,
                dataIndex:item.key,
                key:item.key,
            })
        })
        tableColums.push({
                title:"操作",
                dataIndex:"action",
                key:"action",
                render:(text,record)=>(<div>
                    <Button onClick={()=>{
                        this.props[FlagConfig.store].record = record;
                        this.props[FlagConfig.store].showEdit = true
                    }} type="primary">编辑</Button>
                    <Button onClick={()=>{
                        this.props[FlagConfig.store].record = record;
                        this.props[FlagConfig.store].showDelete = true
                    }} type="danger">删除</Button>

                </div>)
        })
        return <div>
           <Table
           dataSource={ this.props[FlagConfig.store].data}
           columns={tableColums}
           />
            <EditModal/>
            <AddModal/>
            <DeleteModal/>
        </div>
    }
}
export default Form.create()(Index);