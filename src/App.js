import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Default from './components/Default'
import Details from './components/Details'
import Modal from './components/Modal'



export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<Default />} />
        </Routes>
        <Modal />
      </React.Fragment>
    )
  }
}
