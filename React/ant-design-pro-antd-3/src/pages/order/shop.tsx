// router 学习
import React, { Component } from 'react'
import { Button } from 'antd';
import router, { RouteData } from 'umi/router'
import Link from 'umi/link'
import Prompt from 'umi/prompt';
import styles from './style.less'


interface ShopProps {
    location: RouteData;
    match:any
}

interface ShopState {

}

class Shop extends Component<ShopProps, ShopState> {
    state = { s: null }

    goWelcome = () => {
        // 普通跳转，不带参数
        // router.push('/welcome')

        // 带参数
        router.push({
            pathname: '/welcome',
            query: {
                name: '1'
            }
        })

        // router.replace()  => 参数和router.push()相同
        // router.go(-1)    往前往后跳转
        // router.goBack()  返回
    }

    goShopDetail = ()=>{
        router.push('/order/shopDetail/'+1)
    }

    render() {
        const { location } = this.props  //获取query参数
        this.props.match.params         // 获取params参数

        // let url = 'http://localhost:8000/order/shop?name=1&age=2'
        // location.pathname = >/order/shop
        // location.query => {age:'2',name:'1'}
        // search => "?name=1&age=2"

        console.log(location);

        return (
            
            <div className='wf'>
                <h2 className={styles.name}>标题 <span className={styles.fbt}>副标题</span></h2>
                <div className={styles.footer}>全局样式</div>
                <Button onClick={this.goWelcome}>跳转到welcome</Button>
                <Button onClick={this.goShopDetail}>跳转到详情</Button>
                <Link to="/welcome?name=1"> 声明式跳转</Link>
                {/* 离开当前页面确认弹窗 */}
                <Prompt
                    when={true}
                    message={location => {
                        return window.confirm(`confirm to leave to ${location.pathname}?`);
                    }}
                />
            </div>
        );
    }
}

export default Shop;