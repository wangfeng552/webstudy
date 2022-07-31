import React, { useEffect,useState } from 'react'
import styles from './index.less';
import {Button} from 'antd'
import {getTags} from '@/services/user'

interface UserList{
  name:string;
  value:number;
  type:number;
}

export default function IndexPage() {

  const [data,setUserList] = useState<UserList[]>([])

  useEffect( ()=>{
    // getTags().then((res)=>{
    //   setUserList(res.list)
    // })
    getTagsList()
  },[])

  const getTagsList =async ()=>{
    const res = await getTags()
    setUserList(res.list)
  }

  return (
    <div>
      {
        data.map((item,index)=>{
          return (
            <div key={index}>{item.name}</div>
          )
        })
      }
    </div>
  );
}
