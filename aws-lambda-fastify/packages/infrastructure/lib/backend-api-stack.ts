import * as cdk from 'aws-cdk-lib'
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import { RestApi, Cors, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import * as path from 'path'

export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Lambda
    const todosLambda = new lambda_nodejs.NodejsFunction(this, 'todos-lambda', {
      entry: path.join(__dirname, '../../backend/src/lambda.ts'),
      handler: 'handler',
      bundling: {
        sourceMap: true,
      },
    })

    // REST API Gateway
    const todosRestApi = new RestApi(this, 'todos-rest-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: ['http://localhost:3000'],
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    })

    const todosLambdaIntegration = new LambdaIntegration(todosLambda)

    todosRestApi.root
      .addResource('{proxy+}')
      .addMethod('ANY', todosLambdaIntegration)
  }
}
