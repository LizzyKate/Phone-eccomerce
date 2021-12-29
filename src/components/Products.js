import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProductConsumer } from '../context'


export default class Products extends Component {
    render() {
        const { id, title, img, price, inCart } = this.props.product
        return (
            <ProductWrapper>
                <div className='card'>
                    <div className='img-container p-5' onClick={() => { console.log("You clicked") }}>
                        <Link to='/details'>
                            <img src={img} alt='link' />
                        </Link>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

const ProductWrapper = styled.div`

`;