import React, { useState } from 'react';
import type { TagType, Task} from '../../types/type'
import './style.css';
import { PRIORITY_OPTIONS, TAG_OPTIONS } from '../../constants';

// Propsの型定義
type Props = {
    task: Task;
    onUpdate: (id: number, newValues: Partial<Task>) => void;
    onClose: () => void;
};

const TaskEditModal: React.FC<Props> = ({ task, onUpdate, onClose }) => {

    // 編集中のタスクの状態を管理するモーダル用のstate
    const [editedText, setEditedText] = useState(task.text);
    const [editedPriority, setEditedPriority] = useState(task.priority || "中");
    const [editedTag, setEditedTag] = useState(task.tag || "仕事");
    const [editedDeadline, setEditedDeadline] = useState(task.deadline || "");

    const handleSave = () => {
    // 新しいタスクデータを準備
    const newValues: Partial<Task> = {
        text: editedText,
        priority: editedPriority,
        tag: editedTag,
        deadline: editedDeadline,
    };
    // 親コンポーネントの更新関数を呼び出す
    onUpdate(task.id, newValues);
    };

    // バックグラウンドを押すことでもモーダルを閉じられるようにする機能
    const handleOverlayClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
            <h2>タスクを編集</h2>
        
        <div className="form-group">
            <label htmlFor="task-text">タスク名</label>
            <input
            id="task-text"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label>優先度</label>
          {/* 優先度ラジオボタン */}
            <div className="priority-radio-group">
            {PRIORITY_OPTIONS.map((level) => (
                <label key={level}>
                    <input
                    type="radio"
                    value={level}
                    checked={editedPriority === level}
                    onChange={() => setEditedPriority(level)}
                />
                    {level}
                </label>
            ))}
            </div>
        </div>
        
        <div className="form-group">
            <label>タグ</label>
          {/* タグの選択UI (仮にドロップダウン) */}
            <select value={editedTag} onChange={(e) => setEditedTag(e.target.value as TagType)}>
                {TAG_OPTIONS.map ((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                )
                )}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="task-deadline">締切</label>
            <input
            id="task-deadline"
            type="date"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
            />
        </div>

        <div className="modal-actions">
            <button onClick={handleSave}>保存</button>
            <button onClick={onClose}>閉じる</button>
        </div>
        

        </div>
    </div>
    );
};

export default TaskEditModal;