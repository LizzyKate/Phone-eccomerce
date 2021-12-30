import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../context'
import { ProductWrapper } from './ProductWrapper'
import PropTypes from 'prop-types'


export default class Products extends Component {
    render() {
        const { id, title, img, price, inCart } = this.props.product
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className='card'>
                    <ProductConsumer>
                        {
                            (e) => {
                                return (
                                    <div className='img-container p-5' onClick={() => { e.handleDetail(id) }}>
                                        <Link to='/details'>
                                            <img src={img} alt='link' className='card-img-top' />
                                        </Link>
                                        <button className='cart-btn' disabled={inCart ? true : false} onClick={() => { e.addToCart(id); e.openModal(id) }}>
                                            {inCart ? (
                                                <p className="text-capitalize mb-0" disabled>
                                                    in cart
                                                </p>
                                            ) : (
                                                <i className="fas fa-cart-plus" />
                                            )}
                                        </button>
                                    </div>
                                )
                            }
                        }
                    </ProductConsumer>

                    <div className='card-footer d-flex justify-content-between'>
                        <p className='align-self-center mb-0'>{title}</p>
                        <h5 className='text-blue font-italic mb-0'>
                            <span className='mr-1'>$</span>
                            {price}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

Products.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}

