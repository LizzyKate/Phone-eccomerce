import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'


const ProductContext = React.createContext()

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
    getItem = (id) => {
        const singleProduct = this.state.products.find(e => e.id === id)
        return singleProduct
    }
    handleDetail = (id) => {
        const singleProduct = this.getItem(id)
        this.setState(() => {
            return {
                detailProduct: singleProduct
            }
        })
    }
    addToCart = (id) => {
        let tempProduct = [...this.state.products]
        let index = tempProduct.indexOf(this.getItem(id))
        let product = tempProduct[index]
        product.inCart = true
        product.count = 1
        let price = product.price
        product.total = price
        this.setState(() => {
            return {
                product: tempProduct,
                cart: [...this.state.cart, product]
            }
        }, () => {
            this.addTotal()
        })
    }
    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return {
                modalOpen: true,
                modalProduct: product
            }
        })
        console.log("heee")
    }
    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false
            }
        })
    }
    componentDidMount() {
        this.setProducts()
    }
    setProducts = () => {
        let tempProduct = []
        storeProducts.forEach((e) => {
            const singleProduct = { ...e }
            tempProduct = [...tempProduct, singleProduct]
        })
        this.setState(() => {
            return { products: tempProduct }
        })
    }
    increment = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(e => e.id === id)
        let index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count = product.count + 1
        product.total = product.count * product.price

        this.setState(() => {
            return {
                cart: [...tempCart]
            }

        }, () => {
            this.addTotal()
        })
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(e => e.id === id)
        let index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count = product.count - 1
        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price

            this.setState(() => {
                return {
                    cart: [...tempCart]
                }

            }, () => {
                this.addTotal()
            })
        }


    }
    removeItem = (id) => {
        let tempProduct = [...this.state.products]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter((e) => {
            return e.id !== id
        })
        let index = tempProduct.indexOf(this.getItem(id))
        let removedProduct = tempProduct[index]
        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total = 0
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProduct]
            }
        }, this.addTotal())
    }
    clearCart = () => {
        this.setState(() => {
            return {
                cart: []
            }
        }, () => {
            this.setProducts()
            this.addTotal()
        })
    }
    addTotal = () => {
        let subTotal = 0
        this.state.cart.map((e) => {
            return subTotal += e.total
        })
        let tempTax = subTotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal, increment: this.increment, decrement: this.decrement, removeItem: this.removeItem, clearCart: this.clearCart }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }