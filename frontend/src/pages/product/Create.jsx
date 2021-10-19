import React,{useState} from 'react'
import Modal from '../../Components/modal/Modal'
import {openModal,closeModal} from '../../redux/modal/reducer'
import {Link,useHistory} from 'react-router-dom'
import {createProduct} from '../../redux/admin/product/create/reducer'
import { useSelector,useDispatch } from 'react-redux'

function CreateProduct() {
    const history = useHistory();
    const dispatch = useDispatch();

    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const {newProduct,error,creating} = useSelector(state => state.createProduct)

    const [product,setProduct] = useState({
        title:'',
        description:'',
        size:'',
        color: '',
        image: '',
        price: 0,
        category: []
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (product.title === '' || product.description ==='' || product.size === ''
            || product.color === '' || product.image === ''
        ) {
            dispatch(openModal("Please provide all the credentials"))
        } else {
        dispatch(createProduct(product))
        setProduct({username:'',password:'',email:''})
        newProduct && dispatch(openModal("Product created successfully")) && history.push(`/products/${newProduct._id}`) 
        error && dispatch(openModal(error))    
        } 
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setProduct({...product,[name]:value})
    }
  return (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
    </div>
  )
}

export default CreateProduct
