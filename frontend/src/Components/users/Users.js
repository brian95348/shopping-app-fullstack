import React,{useState} from 'react'

export const Register = () => {
    const [person,setPerson] = useState({
        username:'',
        password:'',
        email:''
    })
    const [people,setPeople] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPerson = {...person, id: new Date().getTime().toString()}
        setPeople([...people,newPerson])
        setPerson({name:'',age:''})
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPerson({...person,[name]:value})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="name" value={person.username} onChange={handleChange}/>
            <label htmlFor="password">password</label>
            <input type="text" id="password" name="name" value={person.password} onChange={handleChange}/>
            <label htmlFor="email">email</label>
            <input type="text" id="email" value={person.email} name="age" onChange={handleChange}/>
            <button type="submit">submit</button>
        </form>
        </>
    )
}

export const Login = () => {
    const [person,setPerson] = useState({
        username:'',
        password:'',
        email:''
    })
    const [people,setPeople] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPerson = {...person, id: new Date().getTime().toString()}
        setPeople([...people,newPerson])
        setPerson({name:'',age:''})
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPerson({...person,[name]:value})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="name" value={person.username} onChange={handleChange}/>
            <label htmlFor="password">password</label>
            <input type="text" id="password" name="name" value={person.password} onChange={handleChange}/>
            <label htmlFor="email">email</label>
            <input type="text" id="email" value={person.email} name="age" onChange={handleChange}/>
            <button type="submit">submit</button>
        </form>
        </>
    )
}
