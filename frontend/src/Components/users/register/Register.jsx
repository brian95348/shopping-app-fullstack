import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Modal from '../../modal/Modal'
import {openModal,closeModal} from '../../../redux/modal/reducer'
import {userRegistration} from '../../../redux/Users/register/reducer'
import './Register.css'

const Register = () => {
    const [user,setUser] = useState({
        username:'',
        password:'',
        passwordConfirm: '',
        email:''
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const {isRegistered,isRegistering,newUser,registrationError} = useSelector(state => state.userRegistration)

    const userSuccess = (data) => {
            dispatch(openModal(`User ${newUser.username} created succesfully`))
            history.push('/auth/login')
    }

    useEffect(()=>{
        console.log('effect');
        console.log(isRegistered,newUser);
        if (isRegistered) {
            userSuccess(newUser)
        }
        if (registrationError) {
            dispatch(openModal(registrationError))
        }
    },[isRegistered,registrationError])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.username === '' || user.password==='' || user.email === '') {
            dispatch(openModal("Please provide all the credentials"))
        } else {
            if (user.password !== user.passwordConfirm){
                dispatch(openModal("Passwords do not match!"))
            } else {
                dispatch(userRegistration(user))
                setUser({username:'',password:'',email:'',passwordConfirm:''})         
            } 
        }
        }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({...user,[name]:value})
    }
    return (
        <> {isRegistering ? <h2>Registering user...</h2> : (
        <>
        {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
        <section className="outer">
        <section className="register-form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-item">
                <label htmlFor="username">username:</label>
                <input type="text" id="username" name="username" value={user.username} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="password">password:</label>
                <input type="password"  name="password" value={user.password} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="passwordConfirm">confirm password:</label>
                <input type="password" name="passwordConfirm" value={user.passwordConfirm} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="email">email:</label>
                <input type="text" id="email" value={user.email} name="email" onChange={handleChange}/>
            </div>
            <div className="register-button-wrapper">
                <button type="submit">Sign up</button>
            </div>
            
        </form>
        </section>
        </section>
        </>
        )}
        </>
    )
}

export default Register