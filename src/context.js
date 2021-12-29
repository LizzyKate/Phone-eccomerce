import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'


const ProductContext = React.createContext()

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct
    }
    handleDetail = () => {
        console.log("hello from detail")
    }
    addToCart = () => {
        console.log("add to cart")
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
            <ProductContext.Provider value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }