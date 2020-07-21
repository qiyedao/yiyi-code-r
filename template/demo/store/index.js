import Axios from '../../common/Yiyi-axios'
const ModuleConfig = require('../../moduleConfig.json')
const FlagConfig = require('../flag.json')
import {observable,action} from 'mobx'
import { message } from 'antd'


class Index{

    @observable data=[{"name":"娇"}]
    @observable record={}
    @observable showEdit = false;
    @observable showDelete = false;

    @action init = ()=>{
        let initData = new Promise((resolve,reject)=>{
            resolve(ModuleConfig.module[FlagConfig.key].request)
        
            })
           return initData
    }

    @action handleGetData = ()=>{
        this.init().then(initData=>{
            console.log(initData,'initData')
            Axios.Get_Common(initData.getURL,{})
            .then(res=>{

            }).catch(err=>{
                
            })
        })
        
    }
    @action handleAddData = (form)=>{
        form.validateFields((err,values)=>{
            if(!err){
                this.init().then(initData=>{
                    console.log(initData,'initData')
                    Axios.Post_Common(initData.postURL,values)
                    .then(res=>{
                        if(res.data.status.code == 1){
                            message.success("添加成功")
                        }else{
                            message.error(res.data.status.message)
    
                        }
                    }).catch(err=>{
    
    
                    })
                })
            }
            
        })
        
        
    }
    @action handleEditData = (form)=>{
        form.validateFields((err,values)=>{
            if(!err){
                values.id = this.record.id
                this.init().then(initData=>{
                    console.log(initData,'initData')
                    Axios.Put_Common(initData.putURL,values)
                    .then(res=>{
                        if(res.data.status.code == 1){
                            message.success("编辑成功")
                        }else{
                            message.error(res.data.status.message)
    
                        }
                    }).catch(err=>{
    
    
                    })
                })
            }
        })
        
        
    }

    @action handleDeleteData = ()=>{
            let values= {}
                values.id = this.record.id
                this.init().then(initData=>{
                    console.log(initData,'initData')
                    Axios.Delete_Rest(initData.deleteURL,values)
                    .then(res=>{
                        if(res.data.status.code == 1){
                            message.success("删除成功")
                        }else{
                            message.error(res.data.status.message)
    
                        }
                    }).catch(err=>{
    
    
                    })
                })
         
        
        
    }
}
export default new Index()