export default {
  namespaced: true,
  state: {
    modalConfirmMode: false,
    modalMaxWidth: '',
    modalTitleBgClass: '',
    modalTitle: '',
    modalSubTitle: '',
    modalSubData: '',
    modalText: '',
    modalPrimBtnTxt: '',
    modalSecBtnTxt: '',
    modalPrimEvent: '',
    modalSecEvent: '',
    modalItemType: ''
  },
  actions: {
    resetModalConfirm ({ commit }) {
      commit('toggleModalConfirm', false)
      commit('setModalMaxWidth', '')
      commit('setModalTitleBgClass', '')
      commit('setModalTitle', '')
      commit('setModalSubTitle', '')
      commit('setModalSubData', '')
      commit('setModalText', '')
      commit('setModalPrimBtnTxt', '')
      commit('setModalSecBtnTxt', '')
      commit('setModalPrimEvent', '')
      commit('setModalSecEvent', '')
      commit('setModalItemType', '')
    }
  },
  getters: {
  },
  mutations: {
    toggleModalConfirm (state, onOff) {
      state.modalConfirmMode = onOff
    },
    setModalMaxWidth (state, modalMaxWidth) {
      state.modalMaxWidth = modalMaxWidth
    },
    setModalTitleBgClass (state, modalTitleBgClass) {
      state.modalTitleBgClass = modalTitleBgClass
    },
    setModalTitle (state, modalTitle) {
      state.modalTitle = modalTitle
    },
    setModalSubTitle (state, modalSubTitle) {
      state.modalSubTitle = modalSubTitle
    },
    setModalSubData (state, modalSubData) {
      state.modalSubData = modalSubData
    },
    setModalText (state, modalText) {
      state.modalText = modalText
    },
    setModalPrimBtnTxt (state, modalPrimBtnTxt) {
      state.modalPrimBtnTxt = modalPrimBtnTxt
    },
    setModalSecBtnTxt (state, modalSecBtnTxt) {
      state.modalSecBtnTxt = modalSecBtnTxt
    },
    setModalPrimEvent (state, modalPrimEvent) {
      state.modalPrimEvent = modalPrimEvent
    },
    setModalSecEvent (state, modalSecEvent) {
      state.modalSecEvent = modalSecEvent
    },
    setModalItemType (state, modalItemType) {
      state.modalItemType = modalItemType
    }
  }
}
