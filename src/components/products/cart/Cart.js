import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCart, getCartByUser } from '../../../react-redux/features/products/productSlice'
import Loader from '../../loader/Loader'
import Wishlist from '../WishlistButton'
import './cart.css'
const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.you)
  const [items, setItems] = useState([])
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(getCartByUser(user.id))
    .then(res => {
      setItems(res.payload)
      setLoading(false)
    }
    )

  }, [])

  const handleCartRemove =  (productId) => {
     dispatch(deleteCart(productId))
      
  }

 

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item => {
      if (newQuantity === 0) return item;
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      console.log(item)
      return item;
    });
    setItems(updatedItems);
    axios.put(`https://odd-slip-ant.cyclic.app/products/cart/${itemId}`, {quantity: newQuantity})
  };
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {
        loading && <Loader />
      }
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <p>{item.name}</p>
            <p>{`$${item.price}`}</p>
            <div className="quantity">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={()=>handleCartRemove(item.productId)}>Remove</button>
        </div>
      ))}
      <div className="total-price">
        <p>Total Price:</p>
        <p>{`$${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default Cart