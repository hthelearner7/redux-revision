import { useReducer } from "react";

const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
};

function reducer(state, action) {
    // console.log(action);

    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + 1 };
        case ACTIONS.DECREMENT:
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function ExampleOne() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    const incrementCount = () => {
        dispatch({ type: "increment" });
    };
    const decrementCount = () => {
        dispatch({ type: "decrement" });
    };

    return (
        <div
            style={{
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <button onClick={decrementCount}>-</button>
            <div>Count: {state.count}</div>
            <button onClick={incrementCount}>+</button>
        </div>
    );
}

export default ExampleOne;
