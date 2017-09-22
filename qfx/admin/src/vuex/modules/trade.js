/**
 * Created by pc2 on 2017/8/25.
 */
const trade = {
  state: {
    tradeSearch:{
      project_no_or_iner_cont: '',//服务项目
      corp_name_cont: '',//企业名称
      provider_name_cont:'',//服务商名称
      supplier_name_cont:'',//负责人
      status_in: '',//交易状态
      category_in: '',//支付方式
      created_at_gteq:'',//支付时间
      created_at_lteq:'',//支付时间
      project_source_eq:''//收款方
    },
    tradePage:1,
    receiverIndex:0,
  },
  mutations: {
    TRADESEARCH(state, val){
      state.tradeSearch = val
    },
    RECEIVERINDEX(state, val){
      state.receiverIndex = val
    },
    TRADEPAGE(state, val){
      state.tradePage = val
    },

  },
  actions: {
    //交易记录查询
    tradeSearch({commit},val){
      commit("TRADESEARCH", val)
    },
    receiverIndex({commit},val){
      commit("RECEIVERINDEX", val)
    },
    tradePage({commit},val){
      commit("TRADEPAGE", val)
    },

  }
}

export default trade
/**
 * Created by pc2 on 2017/9/4.
 */
