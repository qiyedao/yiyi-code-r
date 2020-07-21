import React from 'react';
import ReactDOM from 'react-dom';
import RouterView from './adminRouter';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider, Divider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import 'antd-mobile/dist/antd-mobile.less'
import 'nprogress/nprogress.css'



import 'braft-editor/dist/index.css'

moment.locale('zh-cn');

class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <div style={{height:"100%", width: "100%"}}>
                    <RouterView />
                </div>
            </ConfigProvider>

        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
