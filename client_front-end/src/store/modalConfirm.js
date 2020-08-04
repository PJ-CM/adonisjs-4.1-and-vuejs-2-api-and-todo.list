export default {
  namespaced: true,
  state: {
    modalConfirmMode: false,
    modalTitle: '',
    modalText: '',
    modalBtnText: '',
    modalItemType: ''
  },
  actions: {
  },
  getters: {
  },
  mutations: {
    toggleModalConfirm (state, onOff) {
      state.modalConfirmMode = onOff
    },
    setModalTitle (state, modalTitle) {
      state.modalTitle = modalTitle
    },
    setModalText (state, modalText) {
      state.modalText = modalText
    },
    setModalBtnText (state, modalBtnText) {
      state.modalBtnText = modalBtnText
    },
    setModalItemType (state, modalItemType) {
      state.modalItemType = modalItemType
    }
  }
}
