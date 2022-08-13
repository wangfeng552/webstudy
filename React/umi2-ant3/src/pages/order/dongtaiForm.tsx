import React, { useEffect } from 'react'
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Button, Form, Input, Icon } from 'antd';
import { INewsModelState } from "@/models/news";
import { FormComponentProps } from 'antd/lib/form';
const { Item, create, createFormField } = Form;

type ITemp = INewsModelState & FormComponentProps;

interface IProps extends ITemp {
  dispatch: Dispatch<AnyAction>
}

const DongtaiForm = (props: IProps) => {
  console.log(props);
  
  const { form } = props;
  const {
    getFieldsError,
    getFieldError,
    isFieldTouched,
    getFieldDecorator,
  } = form;
  const usernameError = isFieldTouched('name') && getFieldError('name');
  const ageError = isFieldTouched('age') && getFieldError('age');

  useEffect(() => {
    form.validateFields();
  }, [])

  const changeFormValue = () => {
    const { dispatch } = props
    dispatch({
      type: 'news/changeValue'
    })
  }

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
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <Form layout='inline' onSubmit={handleSubmit}>
      <Item label='用户名：' validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>{getFieldDecorator('name', {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '必填项',
          }, {
            validator: checkUsername,
          }],
      })(<Input />)}</Item>

      <Item label='年龄' validateStatus={ageError ? 'error' : ''} help={ageError || ''}>{getFieldDecorator('age', {
        rules: [{ required: true, message: 'Please input your Age!' }],
      })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}</Item>

      <Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Log in
        </Button>
      </Item>
      <Item>
        <Button onClick={changeFormValue}>改变值</Button>
      </Item>
    </Form>
  )
}

export default connect((state: ConnectState) => {
  return {
    ...state.news
  }
})(
  create<IProps>({
    // 把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 Form.createFormField 标记，注意表单项将变成受控组件, error 等也需要一并手动传入
    mapPropsToFields(props) {
      return {
        name: createFormField(props.newsForm.name),
        age: createFormField(props.newsForm.age),
      };
    },
    // 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange(props, fields) {
      props.dispatch({
        type: 'news/save',
        payload: fields,
      });
    },
  })(DongtaiForm)
)