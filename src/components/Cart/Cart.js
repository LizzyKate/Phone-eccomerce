import React, { Component } from 'react'
import Title from "../Title"
import Columns from './Columns'
import { ProductConsumer } from '../../context'
import Empty from './Empty'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        console.log(this.routes)
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
                                        <div></div>
                                        <CartTotals value={e} history={this.props.history} />
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
