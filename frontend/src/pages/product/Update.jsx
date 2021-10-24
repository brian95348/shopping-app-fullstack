import React, {useEffect,useState} from 'react'
import Modal from '../../Components/modal/Modal'
import {openModal,closeModal} from '../../redux/modal/reducer'
import {Link,useParams,useHistory} from 'react-router-dom'
import {fetchProductDetail} from '../../redux/Product/reducer'
import {updateProduct} from '../../redux/admin/product/update/reducer'
import { useSelector,useDispatch } from 'react-redux'
import './Update.css'

function UpdateProduct() {
    const dispatch = useDispatch();
    const {id} = useParams()
    const {product,loading,detailError} = useSelector(state => state.productDetail)
    const [formProduct, setFormProduct] = useState({...product,imageURL:'',oldURL:product.image})
    const [selectedImage, setSelectedImage] = useState(null)
    const [inputDisplay, setInputDisplay] = useState('none')
    const [divDisplay, setDivDisplay] = useState('inline-block')
    const {isModalOpen,modalContent} = useSelector(state => state.modal)  
    const {updatedProduct,updateError,isUpdated} = useSelector(state => state.updateProduct)
    const {token} = useSelector(state => state.userLogin)
    const history = useHistory();
    const form = new FormData();

    const updateSuccess = () => {
            history.push(`/products/${updatedProduct._id}`)
    }

    const updateFail = () => {
            dispatch(openModal(updateError));
    }

    useEffect(()=>{
        dispatch(fetchProductDetail(id))
    },[isUpdated])

    useEffect(()=>{
        if (isUpdated) {
            setFormProduct({title:'',
                        description:'',
                        size:'',
                        color: '',
                        image: '',
                        price: 0,
                        category: [],
                        imageURL:''
                      })
            setSelectedImage(null)
            updateSuccess()
        }
        if (updateError) {
            updateFail()
        }     
        },[isUpdated,updateError])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formProduct.title === '' || formProduct.description ==='' || formProduct.size === ''
            || formProduct.color === '' || formProduct.image === ''
        ) {
            dispatch(openModal("Please provide all the credentials"))
        } else {
            for (let key in formProduct) {
                form.append(key, formProduct[key])
            } 
            dispatch(updateProduct(id,form,token))
      }
    }

  const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormProduct({...formProduct,[name]:value})
    }

    const handleImageChange = (e) => {
        const value = e.target.files[0]
        setSelectedImage(value)
    }

    const handleChangePicture = () => {
        setInputDisplay('block')
        setDivDisplay('none')
        setFormProduct({...formProduct,image:''})
    }

    useEffect(()=>{
        selectedImage && setFormProduct({...formProduct,image:selectedImage})
    },[selectedImage])

  return (
    <>
    {loading ? <h2>Loading</h2> : detailError ? <h2>{detailError}</h2> : (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
      <section className="product-create-outer-wrapper">
        <section className="product-create-form-wrapper">
            <h3>Update Product</h3>
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
                    <input type="file" name="file" style={{display:inputDisplay}} onChange={handleImageChange}/>
                    {selectedImage && (
                      <div className="selected-img-div">
                        <img  src={(selectedImage && URL.createObjectURL(selectedImage))} width="200px" alt=""/>
                        <br/>
                        <button onClick={()=>setSelectedImage(null)}>Remove</button>
                      </div>
                    )}
                </div>
                <div className="update-image-div" style={{display:divDisplay}}>
                    <img src={`/assets/products/${formProduct.image}`} alt="not found"/>
                    <div className="change-image-div">
                        <button  onClick={handleChangePicture} >Change image</button>
                    </div>
                    
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
                    <button type="submit">Update Product</button>
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
