import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import Products from './Products'
import Title from './Title'



export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='py-5'>
                    <div className='container'>
                        <div className='row'>
                            <Title name='our' title='products' />
                            <ProductConsumer>
                                {
                                    (e) => {
                                        return e.products.map((e) => {
                                            return <Products product={e} key={e.id} />
                                        })

                                    }
                                }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}