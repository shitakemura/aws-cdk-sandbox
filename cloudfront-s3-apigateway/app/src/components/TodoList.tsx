import { Todo } from "src/models/todo";
import TodoItem from "src/components/TodoItem";

const TodoList = () => {
  const todos: Todo[] = [
    { id: "id001", title: "Todo 001", completed: false },
    { id: "id002", title: "Todo 002", completed: true },
    { id: "id003", title: "Todo 003", completed: true },
  ];

  return (
    <div className=''>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
