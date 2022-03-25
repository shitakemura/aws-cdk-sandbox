import { Static, Type } from "@sinclair/typebox";

const TodoSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  completed: Type.Boolean(),
  createdAt: Type.Number(),
});

export type Todo = Static<typeof TodoSchema>;
