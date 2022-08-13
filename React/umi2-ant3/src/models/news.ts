import { Reducer } from 'redux';
import { Effect } from 'dva';

const objectAddValue = (param) => {
    const res = {}
    Object.keys(param).forEach((key) => {
      res[key] = {
        value: param[key],
      }
    })
    return res
  }

export type INewsModelState = {
    newsForm:{
        name:{
            value:string
        },
        age:{
            value:number | null
        }
    }
}

export type INewsModelType = {
    namespace: string;
    state: INewsModelState;
    effects: {
        changeValue:Effect
    };
    reducers: {
      save: Reducer<INewsModelState>;
    };
}

const NewsModel:INewsModelType = {
    namespace:'news',
    state:{
        newsForm:{
            name:{
                value:''
            },
            age:{
                value:null
            }
        }
    },
    effects:{
        *changeValue({ payload }, { call, put }){
            let res = {
                name:'李四',
                age:10
            }
            let objValue = objectAddValue(res)
            // let obj={
            //     name:{
            //         value:'lisi'
            //     },
            //     age:{
            //         value:25
            //     }
            // }
            yield put({
                type: 'save',
                payload: objValue,
              });
            
        }
    },
    reducers:{
        save(state,{payload}){
            return {
                ...state,
                newsForm:{
                    ...state?.newsForm,
                    ...payload
                }
            }
        }
    }

}

export default NewsModel