import React from 'react'
import CartItem from './CartItem'


export default function CartList(props) {

    const { cart } = props.value
    return (
        <div>
            {
                cart.map((e) => {
                    return (
                        <CartItem key={e.id} item={e} value={props.value} />
                    )
                })
            }

        </div>
    )
}
