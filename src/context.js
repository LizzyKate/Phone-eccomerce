import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'


const ProductContext = React.createContext()

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct
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
            console.log(this.state)
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
    render() {
        return (
            <ProductContext.Provider value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }