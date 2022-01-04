import React, { Component } from 'react'
import Title from "../Title"
import Columns from './Columns'
import { ProductConsumer } from '../../context'
import Empty from './Empty'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {
                        e => {
                            const { cart } = e
                            if (cart.length > 0) {
                                return (
                                    <React.Fragment>
                                        <Title name="your" title="cart" />
                                        <Columns />
                                        <CartList value={e} />
                                        <CartTotals value={e} />
                                    </React.Fragment>
                                )
                            } else {
                                return <Empty />
                            }
                        }
                    }
                </ProductConsumer>
            </section>
        )
    }
}
