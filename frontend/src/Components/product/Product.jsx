import {Link} from 'react-router-dom'
import './Product.css'

const Product = (props) => {
    const {_id,image,title,price} = props
    return (
        <section className="product-item">
            <img src={`/assets/products/${image}`} alt=""/>
            <h4>{title}</h4>
            <h4>${price}</h4>
            <Link className="product-link" to={`/products/${_id}`}>View More</Link>
        </section>
    )
}

export default Product