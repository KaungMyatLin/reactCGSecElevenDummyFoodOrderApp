import MealItemForm from './MealItemForm'
import classes from './MealItem.module.css'
import {useContext } from 'react'
import CartContext from '../../../store/cart-context'

const MealItem = (props) => {
  const cartctx = useContext(CartContext);
  const addToCartHandler = amt => {
    cartctx.addItem({
      id: props.id,
      name: props.name,
      amount: amt,
      price: props.price,
    })
  }

  return (
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
    </li>
  )
}

export default MealItem