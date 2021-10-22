import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Modal from '../../modal/Modal'
import {userLogin} from '../../../redux/Users/login/reducer'
import {closeModal,openModal} from '../../../redux/modal/reducer'
import './Login.css'

const Login = () => {
    const dispatch = useDispatch();
    const {isloggingIn,isloggedIn,loginError} = useSelector(state => state.userLogin)
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const history = useHistory();
    
    const [person,setPerson] = useState({
        username:'',
        password:'',
        email:''
    })

    const loginSuccess = () => {
            dispatch(openModal('Login successful'));
            history.push('/products')
    }

    const loginFail = () => {
            dispatch(openModal(loginError));
    }

    useEffect(()=>{
        if (isloggedIn) {
            loginSuccess()
        }
        if (loginError) {
            loginFail()
        }     
        },[isloggedIn,loginError])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (person.username === '' || person.password==='' || person.email === '') {
            dispatch(openModal("Please provide all the credentials"))
        } else {
        dispatch(userLogin(person))
        setPerson({username:'',password:'',email:''})
        console.log(isloggingIn,isloggedIn,loginError);
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
        <section className="outer-wrapper">
        <section className="login-form-wrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-item">
                    <label htmlFor="username">username:</label>
                    <input type="text" id="username" name="username" value={person.username} onChange={handleChange}/>
                </div>
                <div className="login-form-item">
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" name="password" value={person.password} onChange={handleChange}/>
                </div>
                <div className="login-form-item">
                    <label htmlFor="email">email:</label>
                    <input type="text" id="email" value={person.email} name="email" onChange={handleChange}/> 
                </div>
                <div className="login-button-wrapper">
                    <button type="submit">Login</button>
                </div>
            
        </form>
        </section>     
        </section>
    </>
    )
}

export default Login