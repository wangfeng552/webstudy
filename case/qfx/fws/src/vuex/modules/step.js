const step = {
  state: {
    step:false,
    stageStaus:"",
    currentProject:{},
    hasRoot:false,
    currentStage:{},
    hasJumpInApply:false,
    yearChange:false
  },
  mutations: {
    nextStep(state,val){
      state.step = val
    },
    sendStaus(state,val){
      state.stageStaus = val
    },
    sendCurrentProject(state,val){
      state.currentProject = val
    },
    sendHasRoot(state,val){
      state.hasRoot = val
    },
    sendCurrentStage(state,val){
      state.currentStage = val
    },
    sendHasJumpInApply(state,val){
      state.hasJumpInApply = val
    },
    sendYearChange(state,val){
      state.yearChange = val
    },
  },
  actions: {
    // 下一步的操作
    nextStep({commit},val){
      commit("nextStep",val)
    },
    sendStaus({commit},val){
      commit("sendStaus",val)
    },
    sendCurrentProject({commit},val){
      commit("sendCurrentProject",val)
    },
    sendHasRoot({commit},val){
      commit("sendHasRoot",val)
    },
    sendCurrentStage({commit},val){
      commit("sendCurrentStage",val)
    },
    sendHasJumpInApply({commit},val){
      commit("sendHasJumpInApply",val)
    },
    sendYearChange({commit},val){
      commit("sendYearChange",val)
    },
  }
}

export default step
