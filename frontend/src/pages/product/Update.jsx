import React, {useEffect,useState} from 'react'
import Modal from '../../Components/modal/Modal'
import {openModal,closeModal} from '../../redux/modal/reducer'
import {Link,useParams} from 'react-router-dom'
import {fetchProductDetail} from '../../redux/Product/reducer'
import {updateProduct} from '../../redux/admin/product/update/reducer'
import { useSelector,useDispatch } from 'react-redux'
import './Update.css'

function UpdateProduct() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const {product,loading,detailError} = useSelector(state => state.productDetail)
    const [formProduct, setFormProduct] = useState({...product})
    const [selectedImage, setSelectedImage] = useState(formProduct.image)
    const {isModalOpen,modalContent} = useSelector(state => state.modal)  
    const {updatedProduct,updateError} = useSelector(state => state.updateProduct)

    useEffect(()=>{
        dispatch(fetchProductDetail(id))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formProduct.title === '' || formProduct.description ==='' || formProduct.size === ''
            || formProduct.color === '' || formProduct.image === ''
        ) {
            dispatch(openModal("Please provide all the credentials"))
        } else {
            dispatch(updateProduct(id,product))
            if (updatedProduct) {
              dispatch(openModal("Product created successfully"))
              
            }  
            if (updateError) {
              dispatch(openModal(updateError))
            }    
        } 
    }

  const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormProduct({...product,[name]:value})
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0])
    }

  return (
    <>
    {loading ? <h2>Loading</h2> : detailError ? <h2>{detailError}</h2> : (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
      <section className="product-create-outer-wrapper">
        <section className="product-create-form-wrapper">
            <p>Create a new Product</p>
            <form onSubmit={handleSubmit} className="product-create-form">
                <div className="product-create-form-item">
                    <label htmlFor="title">title:</label>
                    <input type="text" name="title" value={formProduct.title} onChange={handleChange}/>
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="description">description:</label>
                    <textarea cols="30" rows="10" name="description" value={formProduct.description} onChange={handleChange}></textarea>
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="image">image:</label>
                    <input type="file" name="file" onChange={handleImageChange}/>
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
                    <input type="text"  value={formProduct.size} name="size" onChange={handleChange}/> 
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="color">color:</label>
                    <input type="text"  value={formProduct.color} name="color" onChange={handleChange}/> 
                </div>
                <div className="product-create-form-item">
                    <label htmlFor="price">price:</label>
                    <input type="number"  value={formProduct.price} name="price" onChange={handleChange}/> 
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

export default UpdateProduct
