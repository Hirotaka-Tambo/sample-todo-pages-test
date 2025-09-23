import React, { useState } from 'react';
import type { Task } from '../../App';
import './style.css';

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

    return (
    <div className="modal-overlay">
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
            <div className='priority-radio-group'>
                <label><input type="radio" value="高" checked={editedPriority === "高"} onChange={() => setEditedPriority("高")} />高</label>
                <label><input type="radio" value="中" checked={editedPriority === "中"} onChange={() => setEditedPriority("中")} />中</label>
                <label><input type="radio" value="低" checked={editedPriority === "低"} onChange={() => setEditedPriority("低")} />低</label>
            </div>
        </div>
        
        <div className="form-group">
            <label>タグ</label>
          {/* タグの選択UI (仮にドロップダウン) */}
            <select value={editedTag} onChange={(e) => setEditedTag(e.target.value)}>
                <option value="仕事">仕事</option>
                <option value="学習">学習</option>
                <option value="家事">家事</option>
                <option value="趣味">趣味</option>
                <option value="買い物">買い物</option>
                <option value="その他">その他</option>
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