import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Modal from '../../modal/Modal'
import {openModal,closeModal} from '../../../redux/modal/reducer'
import './Register.css'

const Register = () => {
    const [person,setPerson] = useState({
        username:'',
        password:'',
        email:''
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (person.username === '' || person.password==='' || person.email === '') {
            dispatch(openModal("Please provide all the credentials"))
        } else {
            setPerson({username:'',password:'',email:''})
            try {
                const {data} = axios.post('http://localhost:5000/api/auth/register',person)
            dispatch(openModal(`User ${data.newUser.username} created succesfully`))
            history.push('/auth/login')
            } catch (error) {
            dispatch(openModal(error))
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPerson({...person,[name]:value})
    }
    return (
        <>
        {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
        <section className="outer">
        <section className="register-form-wrapper">
        <h1>Register for an account</h1>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-item">
                <label htmlFor="username">username:</label>
                <input type="text" id="username" name="username" value={person.username} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="password">password:</label>
                <input type="password" id="password" name="password" value={person.password} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="email">email:</label>
                <input type="text" id="email" value={person.email} name="email" onChange={handleChange}/>
            </div>
            <div className="register-button-wrapper">
                <button type="submit">Sign up</button>
            </div>
            
        </form>
        </section>
        </section>
        </>
    )
}

export default Register