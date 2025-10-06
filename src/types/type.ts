import { TAG_OPTIONS, type PRIORITY_OPTIONS } from "../constants";

export type Task = {
    id: number;
    text: string;
    done: boolean;
    deadline: string;
    priority: PriorityType;
    tag: TagType;
};

export type FilterType = "All" | "Todo" | "Done";
export type PriorityType = (typeof PRIORITY_OPTIONS)[number];
export type TagType = (typeof TAG_OPTIONS)[number];
export type SortKeyType = "priority" | "tag" | "createdAt";