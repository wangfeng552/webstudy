import { uploadFile } from '@/services/file';
import { PlusOutlined } from '@ant-design/icons';
import { message, Spin, Upload } from 'antd';
import BMF from 'browser-md5-file';
import type { FC} from 'react';
import { useEffect, useState } from 'react';

interface ImgUploadProps {
  storageType: string; // 文件类型
  value?: undefined;
  onChange?: (value: string) => void;
}

const beforeUpload = (file: any) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg' ||
    file.type === 'image/gif';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload: FC<ImgUploadProps> = ({ value, storageType, onChange }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  // 自定义上传
  const customUpload = (info: any) => {
    setLoading(true);
    const bmf = new BMF();

    bmf.md5(info.file, (err: any, md5: any) => {
      const formData = new FormData();
      formData.append('file_md5', md5);
      formData.append('file', info.file);
      formData.append('storage_type', storageType);

      uploadFile(formData)
        .then((res: any) => {
          setLoading(false);
          if (res.error.code === 0) {
            if (onChange) {
              onChange(res.data.publicUrl);
            }
          } else {
            message.error('上传失败');
          }
        })
        .catch(() => {
          setLoading(false);
        });
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
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
    <Spin spinning={loading}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
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
    </Spin>
  );
};

export default ImgUpload;
