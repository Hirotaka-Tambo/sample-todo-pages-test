import "./style.css";

type Props = {
    // 全て/進行中/完了
    filter: "All" | "Todo" | "Done";
    setFilter: (filter: "All" | "Todo" | "Done") => void;
    
    // ソート順
    sortKey: "priority"|"tag"|"createdAt";
    setSortKey: (sort: "priority"|"tag"|"createdAt") => void;

    // 各セクションのtaskの数を表示
    totalCount: number;
    todoCount: number;
    doneCount: number;
};

const Filter = ({ filter, setFilter, sortKey, setSortKey, totalCount, todoCount, doneCount}: Props) => {
    return (
    <div>
    <hr></hr>
    <div className="filter-group">

    {/*フィルター(All/Todo/Done)の表示*/ }
    <div className="filter-container">
        <label>
        <input
        type="radio"
        checked={filter === "All"}
        onChange={() => setFilter("All")}
        />
        All ({totalCount})
        </label>
        <label>
        <input
        type="radio"
        checked={filter === "Todo"}
        onChange={() => setFilter("Todo")}
        />
        Todo ({todoCount})
        </label>
        <label>
        <input
        type="radio"
        checked={filter === "Done"}
        onChange={() => setFilter("Done")}
        />
        Done ({doneCount})
        </label>
    </div>

    {/*ソートの表示 */}
    <div className="sort-container">
        <label>
            <input
            type="radio"
            name="sort"
            checked={sortKey === "createdAt"}
            onChange={() => setSortKey("createdAt")}
            />
            作成日時順
        </label>
        <label>
            <input
            type="radio"
            name="sort"
            checked={sortKey === "priority"}
            onChange={() => setSortKey("priority")}
            />
            優先度順
        </label>
        <label>
            <input
            type="radio"
            name="sort"
            checked={sortKey === "tag"}
            onChange={() => setSortKey("tag")}
            />
            タグ順
        </label>
    </div>

    </div>


    
</div>
);
};

export default Filter;
