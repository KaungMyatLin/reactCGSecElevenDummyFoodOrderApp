import classes from './MealItemForm.module.css';
import Input from '../../UI/Input'
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [amtIsValid, setAmtIsValid] = useState(true);
    const amtInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const entAmt = amtInputRef.current.value;
        const int_entAmt = +entAmt;

        if (entAmt.trim().length=== 0 || int_entAmt <1 || int_entAmt >5) {
            setAmtIsValid(false);
            return;
        }
        props.onAddToCart(int_entAmt);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amtInputRef}
            label="Amount"
            input={{id: 'amount_' + props.id, type:'number', min:'1', max:'5', step:'1', defaultValue:'1'}} />
            <button>+ Add</button>
            {!amtIsValid && <p>Please enter (1-5).</p>}
        </form>
    )
}

export default MealItemForm