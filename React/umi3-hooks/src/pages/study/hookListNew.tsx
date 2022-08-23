import React, { useEffect, useState } from 'react';
import { getUserList, deleteUser } from '@/services/user';
import { Space, Table, Input } from 'antd';
import { useRequest } from 'umi';
interface UserListType {
  id: number;
  name: string;
  value: number;
  type: number;
  area: number;
}

export default function IndexPage(props) {
  const [name, setName] = useState('');

  useEffect(() => {
    tableData.run({ current: 1, pageSize: 10 });
  }, []);

  // 删除操作
  const delTag = (record, index) => {
    deleteUser({ id: record.id }).then((res) => {
      tableData.run(tableData.params[0]);
    });
  };

  // 搜索
  const search = () => {
    tableData.run(tableData.params[0]);
  };

  // 重置
  const resert = () => {
    setName('');
    tableData.run({ current: 1, pageSize: 10 });
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

  // 方法2使用useRequest 后台不是直接返回data需处理
  // data格式必须 {data:[]}
  // 开启分页 paginated: true, data:{list:[],total:10}
  // loading 异步请求状态
  // error 异步请求失败返回结果
  // let {data,loading,error} = useRequest(async ()=>{
  //   const res = await getUserList()
  //   return {
  //     data:res.list
  //   }
  // })

  const tableData = useRequest(
    ({ current, pageSize, sorter: s, filters: f }) => {
      const p: any = { pageSize };
      p.pageNumber = current;
      // 排序
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      // 过滤
      if (f?.area) {
        p.area = f.area;
      }
      if (name) {
        p.name = name;
      }
      return getUserList(p);
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

  const { sorter = {}, filters = {} } = tableData.params[0] || ({} as any);

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
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
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
  ];
  return (
    <>
      <Input
        style={{ width: 200 }}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={search}>搜搜</button>
      <button onClick={resert}>重置</button>
      <Table
        columns={columns}
        dataSource={tableData.tableProps.dataSource}
        loading={tableData.loading}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 10,
          showTotal: () => (
            <div style={{ color: "#656565" }}>
              共 {tableData.pagination.total} 条
            </div>
          ),
          current: tableData.pagination.current,
          pageSize: tableData.pagination.pageSize,
          total: tableData.pagination.total,
        }}
        onChange={(params, sorter, filters) => {
          tableData.tableProps.onChange(params, sorter, filters);
        }}
      />
    </>
  );
}
