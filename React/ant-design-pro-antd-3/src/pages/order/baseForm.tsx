import React, { useState, useEffect } from 'react'
import { connect } from "dva"
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from "antd/es/form";
import { ConnectState, ConnectProps } from '@/models/connect'
import { CurrentUser } from '@/models/user'

interface BaseFormProps extends FormComponentProps { }
interface BaseFormProps extends ConnectProps {
    currentUser: CurrentUser
}
const BaseForm = (props: BaseFormProps) => {

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    useEffect(() => {
        props.form.validateFields();
    }, [])

    const checkUsername = (rule: any, username: string, callback: any) => {
        if (/\s/.test(username)) {
            callback('输入存在空格,请检查');
        }
        else {
            callback();
        }
    };

    const hasErrors = (fieldsError: any) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const handleSubmit = (e: any) => {
        console.log(e);
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        console.log('submit');
    }

    return (
        <div>
            <Form layout='inline' onSubmit={handleSubmit}>
                <Form.Item label='用户名：' validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: '必填项',
                            }, {
                                validator: checkUsername,
                            }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label='密码' validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>

            </Form>
        </div >
    )
}
const WrappedBaseForm = Form.create({ name: 'base_form' })(BaseForm);
export default connect(
    ({ loading, user }: ConnectState) => ({
        currentUser: user.currentUser,
    })
)(WrappedBaseForm)