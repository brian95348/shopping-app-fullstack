export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const openModalRequest = (modalContent)=>{
    return {
        type:OPEN_MODAL,
        payload:modalContent
    }
}

export const closeModalRequest = ()=>{
    return {
        type:CLOSE_MODAL
    }
}

