import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from "aws-lambda";

const todos = [
  { useId: "user001", id: "id001", title: "First Todo", completed: false },
];

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  console.log(`userId: ${userId}`);

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};
