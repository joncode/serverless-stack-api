import * as uuid from "uuid";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-2" });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
	// Request body is passed in as a JSON encoded string in 'event.body'

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
	console.log('\n\nCREATE-OLD 22', data, event.requestContext.identity.cognitoIdentityId, params);
	console.log(AWS.config);

	dynamoDb.put(params, (error, data) => {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		};


		if (error) {
			// console.log(error);
			error['status'] = false;
			const response = {
				statusCode: error.statusCode,
				headers: headers,
				body: JSON.stringify(error)
			};
			callback(null, response);
			return;
		}
		// Return status code 200 and the newly created item
		const response = {
			statusCode: 200,
			headers: headers,
			body: JSON.stringify(params.Item)
		};
		callback(null, response);
	});
}