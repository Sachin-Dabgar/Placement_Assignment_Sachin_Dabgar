import React, { useState } from "react";

const Todo = ({ todo, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editText.trim() !== "") {
            dispatch({
                type: "EDIT_TODO",
                payload: { id: todo.id, text: editText },
            });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(todo.text);
    };

    return (
        <div className="flex items-center justify-between p-4 border-b">
            {isEditing ? (
                <>
                    <input
                        className="flex-grow px-2 py-1 mr-4 border border-gray-400"
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <div>
                        <button
                            className="px-2 py-1 mr-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="text-lg">{todo.text}</span>
                    <div>
                        <button
                            className="px-2 py-1 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() =>
                                dispatch({
                                    type: "REMOVE_TODO",
                                    payload: todo.id,
                                })
                            }
                        >
                            Remove
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Todo;
