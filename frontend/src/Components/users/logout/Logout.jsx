import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {userLogout} from '../../../redux/Users/login/reducer'
import Modal from '../../modal/Modal'
import {openModal,closeModal} from '../../../redux/modal/reducer'
import './Logout.css'

function Logout() {
    const dispatch = useDispatch();
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogout())
        history.push('/')
    }
  return (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
      <section className="logout-outer-wrapper">
        <section className="logout-form-wrapper">
            <p>Continue with Logging out?</p>
            <form onSubmit={handleSubmit} className="logout-form">
                <div className="logout-button-wrapper">
                    <button className="logout-btn" type="submit">Yes</button>
                    <Link className="logout-link" to="/products">No</Link>
                </div>       
        </form>
        </section>     
        </section>
    </div>
  )
}

export default Logout
