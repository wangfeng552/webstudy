import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getOnlineAmount } from '../services/home'

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: HomeModelState) => T) => T },
  ) => void;

  export interface ModelType {
    namespace: string;
    state: HomeModelState;
    effects: {
      getOnlineAmount: Effect,
      setWaterTempModelQueryData: Effect;
    };
    reducers: {
      save: Reducer<HomeModelState>;
      clear: Reducer<HomeModelState>;
    };
  }

  const initState = {
    onlineAmount: 0,
    totalAmount: 0,
    faultRate: 0,
    onlineAmountPerHour: [],
  };

  const quality:ModelType = {
    namespace:'home',
    state:initState,
    effects:{
        *getOnlineAmount({payload},{call,put}){
            const { carType, carBrand } = payload;
            const result = yield call(getOnlineAmount, data);
            yield put({
                type:'save',
                payload:{
                    onlineAmount: result.content[0].onlineAmount,
                    totalAmount: result.content[0].totalAmount,
                    faultRate: result.content[0].faultRate,
                }
            })
        },
        *setWaterTempModelQueryData({ payload }, { put }) {
            yield put({
              type: 'save',
              payload: {
                onlineAmountPerHour: payload.onlineAmountPerHour,
              },
            });
          },
    },
    reducers:{
        save(state,{payload}){
            return {
                ...state,
                ...payload,
            }
        },
        clear(){
            return initState
        }
    },
    subscriptions:{
        setup({dispatch,history}):void{
            history.listen({pathname}):void=>{
                // 若页面离开，则清空表格
                if (pathname !== '/quality/diagnosis/query') {
                    dispatch({
                      type: 'setWaterTempModelQueryData',
                      payload: {
                        onlineAmountPerHour: [],
                      },
                    });
                  }
            }
        }
    }
  }

  export default quality