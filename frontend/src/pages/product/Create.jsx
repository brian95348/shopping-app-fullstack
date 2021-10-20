import React,{useState} from 'react'
import Modal from '../../Components/modal/Modal'
import {openModal,closeModal} from '../../redux/modal/reducer'
import {Link,useHistory} from 'react-router-dom'
import {createProduct} from '../../redux/admin/product/create/reducer'
import { useSelector,useDispatch } from 'react-redux'
import './Create.css'

function CreateProduct() {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null)
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const {newProduct,createError,creating} = useSelector(state => state.createProduct)
    const {token} = useSelector(state => state.userLogin)

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
            dispatch(createProduct(product,token))
            setProduct({title:'',
                        description:'',
                        size:'',
                        color: '',
                        image: '',
                        price: 0,
                        category: []
                      })
            if (newProduct) {
              dispatch(openModal("Product created successfully"))

            }  
        } 
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setProduct({...product,[name]:value})
    }
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0])
    }
  return (
      <>
      {creating ? <h2>Adding product...</h2> : createError ? <h2>{createError}</h2> : (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
      <section className="product-create-outer-wrapper">
        <section className="product-create-form-wrapper">
            <h4>Create a new Product</h4>
            <form onSubmit={handleSubmit} className="product-create-form">
                <div className="product-create-form-item">
                    <label htmlFor="title">title:</label>
                    <input type="text" name="title" value={product.title} onChange={handleChange}/>
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="description">description:</label>
                    <textarea cols="30" rows="10" name="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="image">image:</label>
                    <input type="file" name="file"  onChange={handleImageChange}/>
                    <input type="text" name="image" style={{display:'none'}} value={selectedImage && URL.createObjectURL(selectedImage)} />
                    {selectedImage && (
                      <div className="selected-img-div">
                        <img  src={URL.createObjectURL(selectedImage)} width="200px" alt="not found"/>
                        <br/>
                        <button onClick={()=>setSelectedImage(null)}>Remove</button>
                      </div>
                    )}
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="size">size:</label>
                    <input type="text"  value={product.size} name="size" onChange={handleChange}/> 
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="color">color:</label>
                    <input type="text"  value={product.color} name="color" onChange={handleChange}/> 
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="price">price:</label>
                    <input type="number"  value={product.price} name="price" onChange={handleChange}/> 
                </div>
                <div className="product-create-button-wrapper">
                    <button type="submit">Create Product</button>
                </div>
            
        </form>
        </section>     
        </section>
    </div>
      )}
    </>
  )
}

export default CreateProduct
