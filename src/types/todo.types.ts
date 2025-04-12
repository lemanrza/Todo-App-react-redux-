export interface Todo {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: string;
  }
  
  export enum TodoStatus {
    ALL = "all",
    COMPLETED = "completed",
    PENDING = "pending",
  }