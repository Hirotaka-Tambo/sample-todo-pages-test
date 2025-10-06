import {useState} from "react";
import "./style.css";
import type { PriorityType, TagType } from "../../types/type";
import { TAG_OPTIONS } from "../../constants";

type Props = {
    onAddTask: (
    text: string,
    deadline?: string,
    priority?: PriorityType,
    tag?: TagType
    ) => void;
    priority: PriorityType;
    setPriority: (priority: PriorityType) => void;
    tag: TagType;
    setTag: (tag: TagType) => void;
};

const TaskInput = ({ onAddTask,priority,setPriority,tag,setTag }: Props) => {
    const [input, setInput] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleAdd = (e:React.FormEvent) => {
        e.preventDefault();
        onAddTask(input, deadline || undefined, priority, tag);
        setInput("");
        setDeadline("");
        setPriority("高");
        setTag("仕事");
    };

    return (
    <form className="task-Input" onSubmit={handleAdd}>
        <div className="main-input">
            <input
            type="text"
            placeholder="新規タスク名/期限を入力"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            />
        <button type="submit">追加</button>
        </div>
        
        <div className="sub-input">
            {/* 優先度選択 */}
        <div className="priority-input">
            {(["高", "中", "低"] as const).map((level) => (
            <label key={level}>
                <input
                type="radio"
                name="priority"
                value={level}
                checked={priority === level}
                onChange={() => setPriority(level)}
                />
                <span className={level === "高" ? "high" : level === "中" ? "medium" : "low"}>
                {level}
                </span>
            </label>
        ))}
        </div>

            <div className="category-input">
                <label>
                    <select value={tag} onChange={(e) => setTag(e.target.value as TagType)}>
                        {TAG_OPTIONS.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
                </select>
                </label>
            </div>
        </div>
        
    </form>

    );
};

export default TaskInput;