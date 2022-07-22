import React, { useState, useEffect } from 'react'
import { connect } from "dva"
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from "antd/es/form";
import { ConnectState, ConnectProps } from '@/models/connect'
import { CurrentUser } from '@/models/user'

interface dynamicFormProps extends FormComponentProps { }
interface dynamicFormProps extends ConnectProps {
    currentUser: CurrentUser
}
let id = 0;

const dynamicForm = (props: dynamicFormProps) => {

    useEffect(()=>{
        props.form.setFieldsValue({ names: ["手动赋值1", "手动赋值2"],remarks:[10,20] }); 
        id=2
        console.log(1);
        
    },[])

    const setFormValue = ()=>{
       
    }

    const remove = k => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    const add = () => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        console.log(keys);

        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values',values);
                
                let names = values.names
                let remarks = values.remarks
                let data:any= []
                names.forEach((item,index)=>{
                    data.push({
                        name:item,
                        remark:remarks[index]
                    })
                })

                console.log(data);
                
            }
        });
    };

    const { getFieldDecorator, getFieldValue } = props.form;

    const formItemLayout = {
        labelCol: {
            sm: { span: 4 },
        },
        wrapperCol: {
            sm: { span: 20 },
        },
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            sm: { span: 20, },
        },
        labelCol: {
            sm: { span: 4 },
        },
        
    }

    getFieldDecorator('keys', { initialValue: [0,1] });
    console.log(2);
    

    const keys = getFieldValue('keys');
    console.log('keys', keys);

    const formItems = keys.map((k, index) => (
        <div key={k+index}>

            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label='Passengers'
                required={false}
                key={`names_${k+index}`}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => remove(k)}
                    />
                ) : null}
            </Form.Item>

            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label="名称"
                key={k+index}>
                {getFieldDecorator(`remarks[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '请输入中文名称!',
                    }],
                })(<Input placeholder="请输入中文名称" style={{ width: '60%', marginRight: 8 }}  />)}
            </Form.Item>

        </div>
    ));

    return (
        <Form onSubmit={handleSubmit}>
            {formItems}
            <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加
                </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
            <Button onClick={setFormValue}>设置值</Button>
        </Form>
    )
}
const WrappeddynamicForm = Form.create({ name: 'base_form' })(dynamicForm);
export default connect(
    ({ loading, user }: ConnectState) => ({
        currentUser: user.currentUser,
    })
)(WrappeddynamicForm)