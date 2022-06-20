import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        const updatedTA = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTA,
        }
    }
    else if (action.type === "RM") {

    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [ cartStatess, dispatCartAction ] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = (item) => {
        dispatCartAction({type: "ADD", item: item})
    }
    const removeItemHandler = (id) => {
        dispatCartAction({type: "RM", id: id})

    }
    const cartContext = {
        items: cartStatess.items,
        totalAmount: cartStatess.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider