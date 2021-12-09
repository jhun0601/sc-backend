import { v4 } from "uuid";

async function handler(event: any, context: any) {
  return {
    statusCode: 200,
    body: "hello from lambda node id: " + v4(),
  };
}

export { handler };
