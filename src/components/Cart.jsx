import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const { cartItems, subtotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  )
  const dispatch = useDispatch()
  const decrement = (id) => {
    dispatch({ type: 'decrement', payload: id })
    dispatch({ type: 'calculatePrice' })
  }
  const increment = (id) => {
    dispatch({ type: 'addToCart', payload: { id } })
    dispatch({ type: 'calculatePrice' })
  }
  const deleteHandler = (id) => {
    dispatch({ type: 'deleteCartItem', payload: id })
    dispatch({ type: 'calculatePrice' })
  }
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              imgSrc={i.imgSrc}
              qty={i.quantity}
              price={i.price}
              name={i.name}
              id={i.id}
              key={i.id}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No Items yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal:${subtotal} </h2>
        <h2>Shipping:${shipping}</h2>
        <h2>Tax:${tax} </h2>
        <h2>Total:${total} </h2>
      </aside>
    </div>
  )
}
const CartItem = ({
  imgSrc,
  qty,
  price,
  name,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt="Item" />
    <article>
      <h3>{name} </h3>
      <p> ${price}</p>
    </article>
    <div className="">
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
)

export default Cart
