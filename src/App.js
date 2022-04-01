import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import localforage from "localforage";

function App() {
  const [task, setTask] = useState({ name: "", completed: "" });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localforage.getItem("tasks", (err, tasks) => {
      if (tasks) {
        setTasks(tasks);
      }
    });
  });

  const getTasks = () => {
    return tasks.map((items, index) => {
      return (
        <li
          key={index}
          className={task.completed ? "green" : "red"}
          onDoubleClick={() => deleteTask(index)}
          onClick={() => updateTask(index)}
        >
          {items.name}
        </li>
      );
    });
  };

  // This funcution store data in local storage

  const storeTasks = (tasks) => {
    setTasks(tasks);

    localforage.setItem("tasks", tasks, (err) => {
      console.log("task added");
    });
  };

  const updateTask = (i) => {
    const newTask = [...tasks];
    newTask.splice(i, 1, {
      name: newTask[i].name,
      completed: !newTask[i].completed,
    });
    storeTasks(newTask);
  };

  const deleteTask = (i) => {
    const newTask = [...tasks];
    newTask.splice(i, 1);
    storeTasks(newTask);
  };

  const addTask = (t) => {
    if (t) {
      const newTask = [...tasks];
      newTask.push({ name: t, completed: false });
      storeTasks(newTask);
      setTask({ name: "", completed: "" });
    } else {
      alert("Enter valid value");
    }
  };

  return (
    <div className="Container">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter the task"
          onChange={(e) => setTask(e.target.value)}
          value={task.name}
        />
        <button onClick={() => addTask(task)}>Click</button>
      </div>

      <ul class="list-group">{getTasks()}</ul>
    </div>
  );
}

export default App;
