import TodoItem from "src/components/TodoItem";
import { useListTodos } from "src/usecases/useListTodos";

const TodoList = () => {
  const { todos, isLoading, error } = useListTodos();

  if (isLoading) <div>isLoading</div>;
  if (error) <div>something is wrong</div>;

  return (
    <div className=''>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
