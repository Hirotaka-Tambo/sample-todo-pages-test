import type { Task } from "../../App";
import "./style.css";

type Props = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggleDone: (id: number) => void;
    onClear: () => void;
};

const TaskList = ({ tasks, onDelete, onToggleDone, onClear }: Props) => {
    return (
    <>
    <ul className="task-list">
        {tasks.map((task) => (
        <li key={task.id}>
            <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleDone(task.id)}
            />
            
            {/*タスクの優先順位*/}
            {task.priority && (
                <span className={`priority ${task.priority}`}>
                    {task.priority}
            </span>
            )}

            {/*タスクタイトル表示*/}
            <span 
            className={task.done ? "task-text done" : "task-text"}
            >
                {task.text}
            </span>

            {/*タスクカテゴリの表示*/}
            {task.tag && (
                <span className={`tag-label ${task.tag.toLowerCase()}`}>
                    {task.tag}
                </span>
            )}

            {/*タスク締め切り表示*/}
            {task.deadline&&(()=>{
                const isOverdue = new Date(task.deadline) < new Date();
                return(
                <span className={isOverdue ? "deadline overdue" : "deadline"}>
                〆切：{task.deadline}
                </span>
            )})()}

            <button onClick={() => onDelete(task.id)}>削除</button>
        </li>
    ))}
    </ul>

    {tasks.length > 0 && (
        <button className ="reset-btn" onClick={onClear} >
        全てリセットする
        </button>
    )}

    
    </>
    );
};

export default TaskList;
