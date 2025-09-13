import {useState} from "react";
import "./style.css";

type Props = {
    onAddTask:(text:string,deadline?:string, 
    priority?: "高" | "中" | "低",
    tag?:string
    )=> void;
    priority: "高" | "中" | "低";
    setPriority: (priority: "高" | "中" | "低") => void;
    tag:string;
    setTag:(tag:string) =>void;

};

const TaskInput = ({ onAddTask,priority,setPriority,tag,setTag }: Props) => {
    const [input, setInput] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleAdd = (e:React.FormEvent) => {
        e.preventDefault();
        if(input.trim() === "")return;
        onAddTask(input, deadline ? deadline:undefined,priority,tag);
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
            placeholder="新しいタスクを入力"
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
            <div className="priority-input">
                <label>
                    <input
                    type="radio"
                    name="priority"
                    value="高"
                    checked={priority === "高"}
                    onChange={() => setPriority("高")}
                />
                    <span className="high">高</span>
                </label>
            
                <label>
                    <input
                    type="radio"
                    name="priority"
                    value="中"
                    checked={priority === "中"}
                    onChange={() => setPriority("中")}
                    />
                    <span className="medium">中</span>
                </label>
            
                <label>
                    <input
                    type="radio"
                    name="priority"
                    value="低"
                    checked={priority === "低"}
                    onChange={() => setPriority("低")}
                    />
                    <span className="low">低</span>
                </label>
            
            </div>

            <div className="category-input">
                <label>タグ：
                    <select value={tag} onChange={(e) => setTag(e.target.value)}>
                        <option value="仕事">仕事</option>
                        <option value="学習">学習</option>
                        <option value="趣味">趣味</option>
                        <option value="家事">家事</option>
                        <option value="買い物">買い物</option>
                        <option value="その他">その他</option>
                    </select>
                </label>
            </div>
        </div>
        
    </form>

    );
};

export default TaskInput;