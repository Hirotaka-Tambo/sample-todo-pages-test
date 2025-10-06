import type {Task} from "../../types/type.ts";
import "./style.css";

type Props = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggleDone: (id: number) => void;
    onClear: () => void;
    onEdit: (id:number) => void;
};

const TaskList = ({ tasks, onDelete, onToggleDone, onClear, onEdit }: Props) => {
    return (
    <div className="task-group">
    <ul className="task-list">
        {tasks.map((task) => (
        <li 
            key={task.id}
            onClick={() => onEdit(task.id)}
        >
            
            {/*タスクの優先順位*/}
            {task.priority && (
                <span className={`priority ${task.priority}`}>
                    {task.priority}
            </span>
            )}

            {/*完了ボタン モーダルには出さない */}
            <input
            type="checkbox"
            checked={task.done}
            onClick={(e) => {
                e.stopPropagation();
                onToggleDone(task.id);
            }}
            />

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
                締切：{task.deadline}
                </span>
            )})()}

            {/*削除ボタン モーダルには出さない */}
            <button onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id)
            }}>削除</button>
        </li>
    ))}
    </ul>

    {tasks.length > 0 && (
        <button className ="reset-btn" onClick={onClear} >
        全てリセット
        </button>
    )}

    
    </div>
    );
};

export default TaskList;
