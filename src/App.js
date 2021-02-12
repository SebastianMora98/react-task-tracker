import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTask();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);

    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  // const toggleReminder = (id) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, reminder: !task.reminder } : task
  //     )
  //   );
  // };

  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 100 + 1);
  //   setTasks([...tasks, { id: id, ...task }]);
  // };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    console.log(data);
    setTasks([...tasks, data]);
  };

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      ></Header>
      {showAddTask && <AddTask onAdd={addTask}></AddTask>}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        ></Tasks>
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}

export default App;
