import { useMemo, useState } from "react";
import "./App.css";

function generateTasks() {
  const tasks = [];

  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Task ${i}`,
      completed: i <= 25,
    });
  }

  return tasks;
}

function filterTasks(tasks, tab) {
  if (tab === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (tab === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function slowDown() {
  const start = performance.now();

  while (performance.now() - start < 30) {
    // Artificial delay
  }
}

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => {
        slowDown();

        return (
          <div
            className={`task ${task.completed ? "completed" : ""}`}
            key={task.id}
          >
            <span>{task.title}</span>

            <span className="status">
              {task.completed ? "Completed" : "Active"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const tasks = useMemo(() => {
    return generateTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, tab);
  }, [tasks, tab]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <div className="header">
          <div>
            <h1>Todo App</h1>
            <p>50 tasks • 25 active • 25 completed</p>
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="filters">
          <button
            className={tab === "all" ? "active" : ""}
            onClick={() => setTab("all")}
          >
            All
          </button>

          <button
            className={tab === "active" ? "active" : ""}
            onClick={() => setTab("active")}
          >
            Active
          </button>

          <button
            className={tab === "completed" ? "active" : ""}
            onClick={() => setTab("completed")}
          >
            Completed
          </button>
        </div>

        <div className="task-count">
          Showing {filteredTasks.length} tasks
        </div>

        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
}

export default App;
