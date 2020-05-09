import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import logit from "./libs/consolelog-lib";


export const main = handler(async (event, context) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.tableName,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now()
		}
	};

	logit(params);

	await dynamoDb.put(params);

	return params.Item;
});