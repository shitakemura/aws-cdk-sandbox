import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { CorsHttpMethod, HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as path from 'path';

export class AwsServerlessExpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda
    const serverlessLambda = new NodejsFunction(this, 'serverless-lambda', {
      entry: path.join(__dirname, '../lambda/app.ts'),
      handler: 'handler',
    });

    // HTTP API Gateway
    const serverlessLambdaApi = new HttpApi(this, 'serverless-lambda-api', {
      corsPreflight: {
        allowMethods: [CorsHttpMethod.OPTIONS, CorsHttpMethod.GET],
        allowOrigins: ['http://localhost:3000'],
      },
    });

    // HTTP Lambda Integration
    const serverlessLambdaIntegration = new HttpLambdaIntegration(
      'serverless-lambda-integration',
      serverlessLambda
    );

    // API Routes
    serverlessLambdaApi.addRoutes({
      path: '/{proxy+}',
      integration: serverlessLambdaIntegration,
    });

    // CfnOutput
    new CfnOutput(this, 'api endpoint', {
      value: serverlessLambdaApi.apiEndpoint,
    });
  }
}
