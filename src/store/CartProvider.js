import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const existingCIIdx = state.items.findIndex(i => i.id===action.item.id);
        const existingCI = state.items[existingCIIdx];
        let updatedIs;
        if (existingCI) {
            const updatedI = {
                ...existingCI,
                amount: existingCI.amount + action.item.amount,
            };
            updatedIs = [...state.items];
            updatedIs[existingCIIdx] = updatedI;
        }
        else {
            updatedIs = state.items.concat(action.item)
        }
        const updatedTA = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedIs,
            totalAmount: updatedTA,
        }
    }
    else if (action.type === "RM") {
        const existingCIIdx = state.items.findIndex(i => i.id===action.id);
        const existingCI = state.items[existingCIIdx];
        let updatedIs;
        if (existingCI.amount === 1) {
            updatedIs = state.items.filter(i => i.id !== action.id);
        } else {
            const updatedI = {
                ...existingCI,
                amount: existingCI.amount - 1,
            };
            updatedIs = [...state.items]
            updatedIs[existingCIIdx] = updatedI;
        }
        const updatedTA = state.totalAmount - existingCI.price;
        return {
            items: updatedIs,
            totalAmount: updatedTA,
        }
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