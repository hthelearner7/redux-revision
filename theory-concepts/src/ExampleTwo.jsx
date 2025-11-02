import { useReducer, useState } from "react";

const ACTIONS = {
    ADD_TODO: "add-todo",
    REMOVE_TODO: "remove-todo",
    EDIT_TODO: "edit-todo",
    TOGGLE_TODO: "toggle-todo",
};

function reducer(todos, action) {
    // console.log(action);

    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [
                ...todos,
                {
                    id: Date.now(),
                    title: action.payload.title,
                    isCompleted: false,
                },
            ];
        case ACTIONS.REMOVE_TODO:
            return todos.filter((el) => el.id != action.payload.id);

        case ACTIONS.EDIT_TODO:
            return todos.map((el) => {
                return el.id === action.payload.id
                    ? {
                          title: action.payload.data,
                          id: el.id,
                          isCompleted: el.isCompleted,
                      }
                    : el;
            });

        case ACTIONS.TOGGLE_TODO:
            return todos.map((el) => {
                return el.id === action.payload.id
                    ? { ...el, isCompleted: !el?.isCompleted }
                    : el;
            });
        default:
            return todos;
    }
}

const ExampleTwo = () => {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");
    const [elementNumber, setElementNumber] = useState(-1);
    const [showUpdateInput, setShowUpdateInput] = useState(false);

    const handleSubmit = (event) => {
        // console.log("Form submitted");
        event.preventDefault();
        dispatch({ type: ACTIONS.ADD_TODO, payload: { title: name } });
        setName("");
    };

    const handleRemoval = (id) => {
        dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id } });
    };

    const handleUpdation = () => {
        // console.log("updating");

        dispatch({
            type: ACTIONS.EDIT_TODO,
            payload: { id: elementNumber, data: name },
        });
        setName("");
        setShowUpdateInput(false);
    };

    // console.log(todos);

    return (
        <div>
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="todo-input">ToDo:</label>
                    <input
                        id="todo-input"
                        type="text"
                        placeholder="Enter input: "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button type="submit" disabled={showUpdateInput}>
                        Add
                    </button>
                </form>

                {showUpdateInput && (
                    <button onClick={handleUpdation}>Update</button>
                )}
            </section>

            <section>
                <h1>All Todos</h1>
                {todos?.map((el) => (
                    <div key={el?.id}>
                        <input
                            type="checkbox"
                            value={el?.isCompleted}
                            onChange={() => {
                                dispatch({
                                    type: ACTIONS.TOGGLE_TODO,
                                    payload: { id: el?.id },
                                });
                            }}
                        />
                        <span
                            style={{
                                background: el?.isCompleted ? "blue" : "green",
                            }}
                        >
                            {el?.title}
                        </span>

                        <button onClick={() => handleRemoval(el?.id)}>
                            ❌
                        </button>
                        <button
                            onClick={() => {
                                setShowUpdateInput(true);
                                setName(el?.title);
                                setElementNumber(el?.id);
                            }}
                        >
                            ✍
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ExampleTwo;
