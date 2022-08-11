import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState,useEffect } from 'react';

const getBase64 = (img:any, callback:any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file:any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const ImgUpload = (props:any) => {
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setImageUrl(props.value)
    },[props.value])
    
    const handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    // 自定义上传
    const customUpload = (info:any) => {
        console.log(info);
        setLoading(true);
        getBase64(info.file, (url:any) => {
            setLoading(false);
            setImageUrl(url);
            console.log(url);
            props.onChange(url) //调用form传过来的onChange改变value值
        });
     

    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={customUpload}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default ImgUpload;