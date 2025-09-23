import "./App.css";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";

export type Task = {
  id: number;
  text: string;
  done: boolean;
  deadline?: string;
  priority?: "高"|"中"|"低";
  tag?: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(()=>{
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved): [];
  });

  const [filter, setFilter] = useState<"All" | "Todo" | "Done">("All");
  const [priority,setPriority] = useState<"高" | "中" | "低">("高");
  const [tag,setTag] = useState<string>("仕事");

  // フィルター済みタスク
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Todo") return !task.done;
    if (filter === "Done") return task.done;
    return true;
  });

  // データの保持を行う関数
  useEffect(() =>{
    localStorage.setItem("tasks", JSON.stringify(tasks));},[tasks]);

  // 新規追加する関数
  const addTask = (
    text: string, 
    deadline?:string,
    priority?:"高"|"中"|"低",
    tag?:string
  ) => {
    // 既存のタスクとの重複チェック
    const Duplication = tasks.some(task => task.text === text.trim());
    if(Duplication){
      alert("既存のタスク名と重複しています");
      return;
    }


    // 空白の除去
    if (text.trim() === "") return;
    const newTask: Task = { id: Date.now(), text, done: false, deadline, priority,tag};
    setTasks([...tasks, newTask]);
  };

  // 項目を一つ一つ削除する関数
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 完了後、取り消し線が表示される関数
  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // 全ての項目を削除する関数
  const clearTasks = () =>{
    const ok = window.confirm("本当に全てのタスクを削除しますか？");
    if (ok) {
      setTasks([]);
  }
  };

  
  return (
    <>
      <div className="app-container">
        <h1>ToDo App</h1>
        <TaskInput 
        onAddTask={addTask} 
        priority={priority} 
        setPriority={setPriority}
        tag={tag}
        setTag={setTag}
        />
        <Filter filter={filter} setFilter={setFilter} />
        <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggleDone={toggleDone}
        onClear = {clearTasks}
      />
      </div>
    </>
  );
}

export default App;
