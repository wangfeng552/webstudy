import React, { useEffect, useState } from 'react'
import { getTags,deleteTag } from '@/services/user'
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRequest } from 'umi'
interface UserList {
  id: number;
  name: string;
  value: number;
  type: number;
}

export default function IndexPage() {
  const [data, setUserList] = useState<UserList[]>([])
  const [loading, setLoading] = useState(true)

  const columns: ColumnsType<UserList> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record,index) => (
        <Space size="middle">
          <span onClick={()=>{delTag(record,index)}} >Delete</span>
        </Space>
      ),
    },
  ];

  const delTag = (record,index)=>{
    setLoading(true)
    deleteTag({id:record.id}).then(res=>{
      getTagsList()
    })
  }

  // 方法1 自行loading
  useEffect(() => {
    setLoading(true)
    getTagsList()
  }, [])

  const getTagsList = async () => {
    const res = await getTags()
    setUserList(res.data)
    setLoading(false)
  }

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
      {/* <Button onClick={getList}>手动触发useRequest</Button> */}
    </div>
  );
}
