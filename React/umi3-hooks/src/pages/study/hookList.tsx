import React, { useEffect, useState } from 'react';
import { getUserList, deleteUser } from '@/services/user';
import { Space, Table, Input } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { useRequest } from 'umi';
interface UserListType {
  id: number;
  name: string;
  value: number;
  type: number;
  area:number;
}

export default function IndexPage() {
  const [name, setName] = useState('');

  useEffect(() => {
    getList({ current: 1, pageSize: 10 });
  }, []);

  // 删除操作
  const delTag = (record, index) => {
    deleteUser({ id: record.id }).then((res) => {
      getList(params[0]);
    });
  };

  // 搜索
  const search = () => {
    getList(params[0],name);
  };

  // 清除空参数
  const clearParams = function (obj) {
    let copy = JSON.parse(JSON.stringify(obj));
    for (let key of Object.keys(copy)) {
      if (copy[key] === null || copy[key] === '') {
        delete copy[key];
      }
    }
    return copy;
  };

  // 方法2使用useRequest 

  // data是后端响应的数据包，默认情况下要求格式必须 {data:[]}
  // 开启分页 paginated: true, data:{list:[],total:10}  
  // loading 异步请求状态
  // error 异步请求失败返回结果
  
  // let {data,loading,error} = useRequest(async ()=>{
  //   const res = await getUserList()
  //   return {
  //     data:res.list
  //   }
  // })

  let {
    tableProps,
    run: getList,
    params,
  } = useRequest(
    ({ current, pageSize, sorter: s,filters:f }) => {
      const p: any = { current, pageSize };
      p.pageNumber = current
      // 排序
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      // 过滤
      if(f){
        p.area = f.area
      }
      if (name) {
        p.name = name;
      }
      return getUserList(clearParams(p));
    },
    {
      manual: true,
      paginated: true,
      defaultPageSize: 10,
      refreshDeps: [name],
      formatResult: (res) => {
        return {
          list: res.data,
          total: res.pageable.total,
        };
      },
    },
  );

  const { sorter = {}, filters = {}  } = params[0] || ({} as any);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
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
      sorter: true,
      sortOrder: sorter.field === 'type' ? sorter.order : false,
    },
    {
      title:'Area',
      dataIndex:'area',
      key:'area',
      filters: [
        { text: '上海', value: '1' },
        { text: '北京', value: '0' },
      ],
      filteredValue: filters.area,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <span
            onClick={() => {
              delTag(record, index);
            }}
          >
            Delete
          </span>
        </Space>
      ),
    },
  ]

  console.log(tableProps);
  
  return (
    <div>
      <Input
        style={{ width: 200 }}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={search}>搜搜</button>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
}
