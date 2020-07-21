import React from 'react'
import {HashRouter,Router, Route,Switch, hashHistory, Redirect, IndexRedirect, IndexRoute} from "react-router";
import {Provider} from "mobx-react";
import stores from "./store";
import Loadable from 'react-loadable'
import {message} from "antd";
import {isLoggedIn} from './auth';
import {toJS} from "mobx";



// // 登录验证
const auth = (nextState, replace, callback) => {
    console.log(toJS(stores.layoutStore.menu),"menu");
    // console.log(nextState.location.pathname,"nextState\n",replace,"replace\n",callback,"callback")
     try {
         isLoggedIn().then(isloggedin => {
            // callback();
            if (isloggedin) { // 登录
                sessionStorage.removeItem("nologinInfo")

                console.log('- Auth Passed!')
                callback();
                // hashHistory.replace(nextState.location.pathname);
            } else {

                if( !sessionStorage.nologinInfo){
                    sessionStorage.nologinInfo = 1
                    message.error('您未登录', 1)



                console.log('Redirecting to Login page!')


                }
                setTimeout(function () {
                    sessionStorage.removeItem("nologinInfo")
                    hashHistory.replace('console/login')
                }, 1000)
            }
        })
    } catch (err) {
        message.error(err, 2);
        setTimeout(function () {
            hashHistory.replace('/login')
        }, 1000)
    }
   // callback()

}

function Loading(props) {
  if (props.error) {
    return <div>网页走丢！</div>;
  } else if (props.pastDelay) {
      console.log('loading')
    return <div>Loading...</div>;
  } else {
      console.log('done')
    return null;
  }
}
// const Layout = Loadable({
//     loader:()=>import('./src/layout/layout.js'),
//     loading:Loading,
//     delay:800,
//     // loading(){return<div>loading...</div>}
// })
// const NotFund = Loadable({
//     loader:()=>import('./pages/layout/not.js'),
//     loading:Loading,
//     delay:800,
//     // loading(){return<div>loading...</div>}
// })
const Demo = Loadable({
    loader: () => import('./demo/module/index.js'),

    loading: Loading,

    delay:800,
  })
 
  


const RouterView =(
    <Router history={hashHistory} >
        <Route path="demo" component={Demo}  exact />


       {/* // <Route path="/" component={Layout} > */}
            {/* <IndexRoute component={Expert} onEnter={auth} /> */}
            
       {/* // </Route> */}

        <Redirect from="*" to="demo" />
    </Router>
);

const RouteConfig = () => {
    return <Provider {...stores}>{RouterView}</Provider>;
};

export default RouteConfig
