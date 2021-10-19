import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './Modal.css'

function Modal(props) {
    const {modalContent,closeModal} = props
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(closeModal());
        },3000)
    })
  return (
    <div className="modal-div">
      <p>{modalContent}</p>
    </div>
  )
}

export default Modal
