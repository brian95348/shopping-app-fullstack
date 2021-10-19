import * as actionCreators from './actions'

const initialState = {
    isModalOpen: false,
    modalContent: ''
}

const modalReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true,
                modalContent: action.payload,
            };
        case actionCreators.CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
                modalContent: '',
            };
        default:
            return state;
    }
}

export const openModal = (modalContent) => (dispatch) => {
    dispatch(actionCreators.openModalRequest(modalContent))         
}

export const closeModal = () => (dispatch) => {
    dispatch(actionCreators.closeModalRequest())
}

export default modalReducer