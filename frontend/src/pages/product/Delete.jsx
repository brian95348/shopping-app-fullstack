import React from 'react'
import Modal from '../../Components/modal/Modal'
import {openModal,closeModal} from '../../redux/modal/reducer'
import {Link,useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {deleteProduct} from '../../redux/admin/product/delete/reducer'
import {fetchProducts} from '../../redux/Products/reducer'
import './Delete.css'

function ProductDelete() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.userLogin)
    const {isModalOpen,modalContent} = useSelector(state => state.modal)
    const {deleted,error} = useSelector(state => state.deleteProduct)
    const {id} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(deleteProduct(id,token))
        error && dispatch(openModal(error)) 
        deleted && dispatch(openModal(`Product with id: ${id} succesfully deleted`)) && dispatch(fetchProducts())
        history.push('/products')
    }
  return (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} modalContent={modalContent} />}
      <section className="product-delete-outer-wrapper">
        <section className="product-delete-form-wrapper">
            <p>Continue with Deleting the product with id: {id}?</p>
            <form onSubmit={handleSubmit} className="product-delete-form">
                <div className="product-delete-button-wrapper">
                    <button className="product-delete-btn" type="submit">Yes</button>
                    <Link className="product-delete-link" to="/products">No</Link>
                </div>       
        </form>
        </section>     
        </section>
    </div>
  )
}

export default ProductDelete
