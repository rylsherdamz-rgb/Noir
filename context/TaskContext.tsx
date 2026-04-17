import {
    createContext,
    SetStateAction,
    useContext,
    useState
} from "react";

type urgencyLevelType = {
  High: "High";
  Medium: "Medium";
  Low: "Low";
};

interface TaskType {
  taskName: string;
  taskId: string;
  taskBody: string;
  taskTitle: string;
  urgencyLevel: urgencyLevelType;
  date: Date;
}

interface taskContextType {
  task: TaskType | undefined;
  setTask: React.Dispatch<SetStateAction<TaskType | undefined>>;
}

export const TaskContext = createContext<taskContextType | undefined>(
  undefined,
);

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [task, setTask] = useState<TaskType | undefined>(undefined);
  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default function useTask() {
  const Task = useContext(TaskContext);
  if (!Task) return;
  const { task, setTask } = Task;

  return { task, setTask };
}
