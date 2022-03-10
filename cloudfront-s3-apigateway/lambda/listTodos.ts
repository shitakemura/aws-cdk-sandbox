import { APIGatewayProxyResultV2 } from "aws-lambda";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  const todos: Todo[] = [
    { id: "id001", title: "Todo 001", completed: false },
    { id: "id002", title: "Todo 002", completed: true },
    { id: "id003", title: "Todo 003", completed: false },
    { id: "id004", title: "Todo 004", completed: true },
    { id: "id005", title: "Todo 005", completed: false },
  ];
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};
