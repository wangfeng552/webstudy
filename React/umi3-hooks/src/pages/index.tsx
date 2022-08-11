import React, { useEffect, useState } from 'react'
import styles from './index.less';
import { getTags } from '@/services/user'
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

  // const [data, setUserList] = useState<UserList[]>([])
  // const [loading, setLoading] = useState(true)

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
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  // 方法1 自行loading
  // useEffect(() => {
    // getTags().then((res)=>{
    //   setUserList(res.list)
    // })
    // getTagsList()
  // }, [])

  // 方法2 使用useRequest
  // let {data,loading,error} = useRequest(async ()=>{
  //   const res = await getTags()
  //   return {
  //     data:res.list
  //   }

  // })

  let {data:listData,loading,run:getList,error} = useRequest(async ()=>{
    const res = await getTags()
    return {
      data:res.list
    }

  },{
    manual:true
  })


  
  // const getTagsList = async () => {
  //   const res = await getTags()
  //   setUserList(res.list)
  //   setLoading(false)
  // }

  // 手动触发useRequest
  const getTable=()=>{

  }

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={listData} rowKey="id" />
      <Button onClick={getList}>手动触发useRequest</Button>
    </div>
  );
}
