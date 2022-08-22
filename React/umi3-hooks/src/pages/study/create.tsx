import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import ImgUpload from '@/components/AvatarUpload'
import Editor from '@/components/Editor';
import {useAccess} from 'umi'

const App = () => {
  const [form] = Form.useForm();
  let access = useAccess()
  console.log("access",access);
  

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.setFieldsValue({
      imgUrl: '',
      password: '',
      username: '',
    });
  };
  // 方法1 使用form - initialValues回显数据
  const initData = {
    imgUrl: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    password: '213',
    remember: false,
    username: 'lisi'
  }

  useEffect(() => {
    // 方法2 使用 form-setFieldsValue回显数据
    // form.setFieldsValue({
    //   imgUrl: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    //   password: '213',
    //   remember: true,
    //   username: 'lisi'
    // });
  }, [])


  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      form={form}
      initialValues={initData}
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
        label="图片"
        name="imgUrl">
        <ImgUpload
        />
      </Form.Item>
      <Form.Item
        label="富文本"
        name="editorDetail">
        <Editor
          defaultHtml="<p>初始化内容哈哈哈</p>"
          isUploadFile={true}
          uploadFileServer="http://rap2api.taobao.org/app/mock/297868/libo/test1/uploadEditorFile"
          maxFileSize={10}
          uploadImgServer="http://rap2api.taobao.org/app/mock/297868/libo/test1/uploadEditorImg"
          maxImgSize={2} />
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
        <Button type="primary" onClick={onReset}>
          resert
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
