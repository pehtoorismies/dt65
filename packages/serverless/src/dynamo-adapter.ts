import { DynamoDB } from 'aws-sdk';

export class DynamoDBAdapter {
  public constructor(private readonly dynamo: DynamoDB) {}

  public async find(
    parameters: DynamoDB.DocumentClient.GetItemInput
  ): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    return new DynamoDB.DocumentClient({ service: this.dynamo })
      .get(parameters)
      .promise();
  }

  public async insert(
    parameters: DynamoDB.DocumentClient.PutItemInput
  ): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    return new DynamoDB.DocumentClient({ service: this.dynamo })
      .put(parameters)
      .promise();
  }

  public async deleteItem(
    parameters: DynamoDB.DocumentClient.DeleteItemInput
  ): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {
    return new DynamoDB.DocumentClient({ service: this.dynamo })
      .delete(parameters)
      .promise();
  }
}
