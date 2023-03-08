
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'

const MyPosts = () => {
  const params = useParams()
    const [products, setProducts] = useState([])
    const user = useSelector(state => state.auth.user)
    const seller = user.id

  
    //fetxh from redux store
    useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get(`http://localhost:9000/products/${seller}`)
        setProducts(data)
      }
      fetchProducts()
    }, [products])

  //delete product with a confirmation message
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await axios.delete(`http://localhost:9000/products/${id}`)
    }
  }

  
  return (
    <div>
         <section className="products myProducts">
        {
          products.map(product => (
            <div className="product">
              <div className="product-img">
                <img src="https://images.unsplash.com/photo-1676809767144-d24ba6178421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="product" />
              </div>
              <div className="product-info">
                <p className="info-name">{product.name}</p>
                <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
              </div>
              <div className="product-btns">
                <p className="info-price">${product.price}</p>
                <p><AiFillDelete style={{color:'red'}} onClick={() => handleDelete(product.id, product.name)} /></p>
              </div>
              <div className='favorite'>
                <AiFillEdit style={{color:'4b59f7'}} />
              </div>
            </div>
          )
          )

        }

      </section>
    </div>
  )
}

export default MyPosts

