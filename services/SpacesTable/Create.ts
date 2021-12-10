import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from DynamoDB",
  };
  // const item = {
  //     spaceId: uuidv4()
  // }
  const item =
    typeof event.body == "object" ? event.body : JSON.parse(event.body);
  item.spaceId = uuidv4();
  try {
    await dbClient
      .put({
        TableName: "SpacesTable",
        Item: item,
      })
      .promise();
  } catch (error: any) {
    result.body = error.message;
  }
  result.body = JSON.stringify(`Created with id ${item.spaceId}`);
  return result;
}

export { handler };
