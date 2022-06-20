import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import {useContext, } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {
    const cartctx = useContext(CartContext)

    const totlAmt = `$${cartctx.totalAmount.toFixed(2)}`
    const hasItem = cartctx.items.length >0;

    const cartItemRmHandler = id => {
        cartctx.removeItem(id);
    }
    const cartItemAddHandler = i => {
        cartctx.addItem({...i, amount:1});
    }
    const cartItems = (<ul className={classes['cart-items']}>{
        cartctx.map(i => {
            <CartItem key={i.id} name={i.name} 
            amount={i.amount} price={i.price} 
            onRemove={cartItemRmHandler.bind(null, i.id)}
            onAdd = {cartItemAddHandler.bind(null, i)}
            />
    })
    }</ul>)

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totlAmt}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart