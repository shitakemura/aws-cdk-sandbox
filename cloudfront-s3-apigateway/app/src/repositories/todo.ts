import { useCallback } from "react";
import { getApi } from "src/api";
import { Todo } from "src/models/todo";

const baseUrl = process.env.REACT_APP_API_ENDPOINT_URL;

export const useTodoRepository = () => {
  const listTodos = useCallback(async (): Promise<Todo[]> => {
    const response = await getApi(`${baseUrl}/todos`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as Todo[];
  }, []);

  return { listTodos };
};
