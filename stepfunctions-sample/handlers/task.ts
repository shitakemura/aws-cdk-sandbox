type TaskResponse = {
  title: string;
  message: string;
}

export async function handler(event: any): Promise<TaskResponse> {
  console.log(JSON.stringify(event));

  return {
    title: "Hello",
    message: "World",
  };
}
