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

    const createValues = (values) => {
        const { row } = this.state;
        const data = [];
        const newValues = { // 用新的对象承载提交的数据
          ...values,
        };
        const fieldNameData = []; // 保存fieldName值
        const remarksData = []; // 保存remarks值
        const isImgData = []; // 保存isImg值
        const orderData = []; // 保存orderData值
        const fieldName = RegExp(/fieldName/);
        const remarks = RegExp(/remarks/);
        const isImg = RegExp(/isImg/);
        for (const key in newValues) {
          if (fieldName.test(key)) {
            fieldNameData.push(newValues[key]);
          }
        }
        for (const key in newValues) {
          if (remarks.test(key)) {
            remarksData.push(newValues[key]);
          }
        }
        for (const key in newValues) {
          if (isImg.test(key)) {
            isImgData.push(newValues[key]);
          }
        }
        for (const key in newValues) {
          if (isImg.test(key)) {
            orderData.push(newValues[key]);
          }
        }
        fieldNameData.forEach((item, index) => {
          data.push({
            fieldName: item,
            remarks: remarksData[index],
            isImg: isImgData[index],
            order: orderData[index],
            id: row.dataType ? row.dataType.id : '',
          });
        });
        return data;
      };

    const { getFieldDecorator, getFieldValue } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    }

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    }

    getFieldDecorator('keys', { initialValue: [] });

    const keys = getFieldValue('keys');
    console.log('keys', keys);

    const formItems = keys.map((k, index) => (
        <div key={k}>

            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={`names_${k}`}
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
                label="名称"
                key={k+1}>
                {getFieldDecorator(`remarks[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        message: '请输入中文名称!',
                    }],
                })(<Input placeholder="请输入中文名称" />)}
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
        </Form>
    )
}
const WrappeddynamicForm = Form.create({ name: 'base_form' })(dynamicForm);
export default connect(
    ({ loading, user }: ConnectState) => ({
        currentUser: user.currentUser,
    })
)(WrappeddynamicForm)