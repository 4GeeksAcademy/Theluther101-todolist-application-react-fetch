import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItems] = useState("");

  useEffect(() => {
    const fetchToDo = async () => {
      const data = await fetch("https://playground.4geeks.com/todo/users/ggg");
      if (data.ok) {
        const result = await data.json();
        setToDoItems(result.todos);
      } else {
        await fetch("https://playground.4geeks.com/todo/users/ggg", {
          method: "POST",
        });
        setToDoItems([]);
      }
    };
    fetchToDo();
  }, []);

  const handleAddItem = async () => {
    if (newItem) {
      let task = {
        label: newItem,
        done: false,
      };

      const data = await fetch(
        "https://playground.4geeks.com/todo/todos/ggg",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-type": "application/json" },
        }
      );

      const result = await data.json();
      setToDoItems([...toDoItems, result]);
      setNewItems("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleDeleteItem = async (index) => {
    const data = await fetch(
      `https://playground.4geeks.com/todo/todos/${toDoItems[index].id}`,
      {
        method: "DELETE",
      }
    );
    setToDoItems(toDoItems.toSpliced(index, 1));
  };

  const handleUpdateTodo = async (index) => {
    const updatedToDo = {
      label: toDoItems[index].label,
      is_done: !toDoItems[index].is_done,
    };

    const data = await fetch(
      `https://playground.4geeks.com/todo/todos/${toDoItems[index].id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedToDo),
        headers: { "Content-type": "application/json" },
      }
    );
    const result = await data.json();
    setToDoItems(toDoItems.toSpliced(index, 1, result));
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">To-Do List</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new item"
              value={newItem}
              onChange={(e) => setNewItems(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>
          </div>
          <ul className="list-group">
            {toDoItems?.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.label}
                <button
                  className="btn btn-danger btn-sm mx-5"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  onChange={() => handleUpdateTodo(index)}
                  checked={item.is_done}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
