import { useState, useCallback, useEffect } from "react";
import { Todo } from "src/models/todo";
import { useTodoRepository } from "src/repositories/todo";

export const useListTodos = () => {
  const { listTodos } = useTodoRepository();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      const todos = await listTodos();
      setTodos(todos);
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(`Failed when list todos`));
      }
    } finally {
      setIsLoading(false);
    }
  }, [listTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, isLoading, error };
};
