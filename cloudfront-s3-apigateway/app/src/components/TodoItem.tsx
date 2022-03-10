import { Todo } from "src/models/todo";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { title, completed } = todo;
  return (
    <div className='flex items-center px-24 py-6'>
      <input
        type='checkbox'
        className='checkbox flex-none'
        checked={completed}
      />
      <label className='flex-auto w-80 px-8'>{title}</label>
      <button className='flex-auto w-32'>Delete</button>
    </div>
  );
};

export default TodoItem;
