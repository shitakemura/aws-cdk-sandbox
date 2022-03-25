import Fastify, { RouteShorthandOptions } from "fastify";
import { Todo } from "../../shared/models/todo";

const PORT = 8080;

const fastify = Fastify({
  logger: true,
});

let todos: Todo[] = [
  {
    id: "id0001",
    title: "test todo 1",
    completed: true,
    createdAt: 1645341489562,
  },
  {
    id: "id0002",
    title: "test todo 2",
    completed: false,
    createdAt: 1645341489562,
  },
];

const listAll: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        todos: {
          type: "array",
        },
      },
    },
  },
};

fastify.get("/todos", listAll, async (request, reply) => {
  return { todos };
});

if (require.main === module) {
  fastify.listen(PORT, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${PORT}`);
  });
}

export default fastify;
