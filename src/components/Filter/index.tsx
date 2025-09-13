import "./style.css";

type Props = {
    filter: "All" | "Todo" | "Done";
    setFilter: (filter: "All" | "Todo" | "Done") => void;
};

const Filter = ({ filter, setFilter}: Props) => {
    return (
    <div>
    <hr></hr>
    <div className="filter-container">
        <label>
        <input
        type="radio"
        checked={filter === "All"}
        onChange={() => setFilter("All")}
        />
        All
        </label>
        <label>
        <input
        type="radio"
        checked={filter === "Todo"}
        onChange={() => setFilter("Todo")}
        />
        Todo
        </label>
        <label>
        <input
        type="radio"
        checked={filter === "Done"}
        onChange={() => setFilter("Done")}
        />
        Done
        </label>
    </div>

    
</div>
);
};

export default Filter;
