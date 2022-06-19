import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCardButton.module.css'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
  const cartctx = useContext(CartContext)
  const numCartItems = cartctx.items.reduce((curNum, item)=> {return curNum + item.Amount} ,0);

  return (
      <button className={`${classes.button}`} onClick={props.onClick}>
        <span className={`${classes.icon}`}>
          <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={`${classes.badge}`}> {numCartItems} </span>
      </button>
  )
}

export default HeaderCartButton