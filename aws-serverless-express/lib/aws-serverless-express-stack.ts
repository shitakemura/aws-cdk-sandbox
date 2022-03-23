import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Cors, RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class AwsServerlessExpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda
    const serverlessLambda = new NodejsFunction(this, 'serverless-lambda', {
      entry: path.join(__dirname, '../lambda/app.ts'),
      handler: 'handler',
    });

    // REST API Gateway
    const serverlessLambdaApi = new RestApi(this, 'serverlessLambdaApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });

    // HTTP Lambda Integration
    const serverlessLambdaIntegration = new LambdaIntegration(serverlessLambda);

    // API Routes
    serverlessLambdaApi.root
      .addResource('{proxy+}')
      .addMethod('ANY', serverlessLambdaIntegration);
  }
}
