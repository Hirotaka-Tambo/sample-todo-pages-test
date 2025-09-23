import "./App.css";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import TaskEditModal from "./components/TaskEditModal";

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
  const [sortKey,setSortKey] = useState<"priority"|"tag"|"createdAt">("createdAt");
  const [searchTerm, setSearchTerm] = useState<string>("");

  
  // フィルター済みタスク
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Todo") return !task.done;
    if (filter === "Done") return task.done;
    return true;
  });

  // 検索でのフィルタリング
  const searchdTasks = filteredTasks.filter((task)=>{
    return task.text.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // フィルター後のタスクのソート
  // ソートは元のデータを上書きしてしまうので、相剋を起こさないように個別で変数を設定する
　// tagは配列の順番を明示的に設定する
  const tagOrder = ["仕事","学習","家事","趣味","買い物","その他"]

  const sortTasks = [...searchdTasks].sort((a,b) =>{
    if(sortKey == "createdAt"){
      return a.id - b.id; // 上から制作順
    }
    if(sortKey == "priority"){
      const prioritySort ={"高":3, "中":2, "低":1};
      return (prioritySort[b.priority || "低"]) - (prioritySort[a.priority || "低"]);
    }
    if(sortKey == "tag"){
      const aIndex = tagOrder.indexOf(a.tag|| "その他");
      const bIndex = tagOrder.indexOf(b.tag || "その他");

      return aIndex - bIndex;
  }
  return 0;
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


    // task追加時の空白除去
    if (text.trim() === "") return;
    const newTask: Task = { id: Date.now(), text, done: false, deadline, priority,tag};
    setTasks([...tasks, newTask]);
  };

  // タスク数の算出
  const totalTasks = tasks.length;
  const todoCount = tasks.filter(task => !task.done).length;
  const doneCount = tasks.filter(task => task.done).length;


  // 項目を一つ一つ削除(削除ボタン)
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };


  // 完了後、取り消し線を表示する関数
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

  // モーダル系統の関数
  // 編集の際のタスク(ID)を保持する関数(表示しない時はnull)
  const [editingTaskId,setEditingTaskId] = useState<number | null>(null);
  // 編集中(モーダル上)のタスクを取得
  const editingTask = tasks.find((task => task.id === editingTaskId));

  // モーダルによる更新を反映する関数
  const updateTask = (id: number, newValues: Partial<Task>) => {
    // 編集中のタスク名前と、新しいタスク名の取得
    const newText = newValues.text?.trim();

    // 新しいタスク名が既存のタスク名と重複していないか確認(newTaskは除外)
  const isDuplication = tasks.some(task => 
    task.id !== id && task.text === newText
  );

  if (isDuplication) {
    alert("このタスク名はすでに存在します。別の名前に変更してください。");
    return; 
  }


  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, ...newValues } : task
    )
  );
  // 編集が完了したら、editingTaskIdをリセット
  setEditingTaskId(null);
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
      <div className="utility-bar">
        <div className="search-and-filter-container">
        <input
        type="text"
        placeholder="タスク名を検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Filter 
        filter={filter} 
        setFilter={setFilter} 
        sortKey={sortKey} 
        setSortKey={setSortKey} 
        
        totalCount={totalTasks}
        todoCount={todoCount}
        doneCount={doneCount}
        />
        </div>
      </div>
        <TaskList
        tasks={sortTasks}
        onDelete={deleteTask}
        onToggleDone={toggleDone}
        onEdit={setEditingTaskId}
        onClear = {clearTasks}
      />
      </div>
      {editingTask && (
    <TaskEditModal
      task={editingTask}
      onUpdate={updateTask}
      onClose={() => setEditingTaskId(null)}
    />
  )}
    </>
  );
}

export default App;
