import React, { useReducer, useState } from "react";
import Todo from "./Todo";

const initialState = {
    todos: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            if (action.payload.trim() !== "") {
                return {
                    todos: [
                        ...state.todos,
                        { id: Date.now(), text: action.payload },
                    ],
                };
            }
            return state;
        case "REMOVE_TODO":
            return {
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case "EDIT_TODO":
            if (action.payload.text.trim() !== "") {
                return {
                    todos: state.todos.map((todo) =>
                        todo.id === action.payload.id
                            ? { ...todo, text: action.payload.text }
                            : todo
                    ),
                };
            }
            return state;
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [todoText, setTodoText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_TODO", payload: todoText });
        setTodoText("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="mb-4 text-3xl font-bold">Todo App</h1>
            <form
                className="flex items-center"
                onSubmit={handleSubmit}
            >
                <input
                    className="px-2 py-1 mr-2 border border-gray-400"
                    type="text"
                    placeholder="Add todo"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <button
                    className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    type="submit"
                >
                    Add
                </button>
            </form>
            <div className="mt-8 w-96">
                {state.todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
