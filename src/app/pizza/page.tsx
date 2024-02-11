'use client'
import { useState, useCallback } from "react";


const Pizza = () => {
    const [pizzaAmount, setPizzaAmount] = useState(0)

    return (
        <div>
            <div>Amount of Pizza</div>
            <button
                className="border border-gray-600 rounded-md p-1 text-xs font-bold"
                onClick={() => setPizzaAmount(pizzaAmount + 1)}>MORE PIZZA BUTTON</button>
            <div>Amount of pizza: {pizzaAmount}</div>
        </div>
    );

}

export default Pizza;
