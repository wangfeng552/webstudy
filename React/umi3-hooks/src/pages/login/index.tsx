import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useModel, history, useRequest } from 'umi'
import { login } from '@/services/user'

const Login = () => {

    // const setInitialState:any = useModel('@@initialState');
    // console.log("setInitialState",setInitialState);
    

    const { initialState, setInitialState }= useModel('@@initialState');

    let { data, loading, run } = useRequest(login, { manual: true })

  

    const onFinish = (values: any) => {
        console.log('Success:', values);
        run(values)

    };

    useEffect(() => {
        if (data) {
            console.log(data);
            
            // 修改全局initialStatus，让layout有机会进入主面板
            // setInitialState({ ...initialState, data: {
            //     isLogin: true,
            //     userinfo: data
            // } })
            setInitialState({
                isLogin: true,
                userinfo: data
            })
            // 触发路由切换
            setTimeout(()=>{
                history.push('/')
            },1000)
        }
    }, [data])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;