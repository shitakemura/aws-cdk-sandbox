import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  UserPool,
  UserPoolClientIdentityProvider,
} from "aws-cdk-lib/aws-cognito";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpUserPoolAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as path from "path";

export class CogniteServerlessStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda
    const listTodosLambda = new NodejsFunction(
      this,
      "cognito-serverless-list-todos-lambda",
      {
        entry: path.join(__dirname, "../lambda/listTodos.ts"),
        handler: "handler",
      }
    );

    // Http API Gateway
    const httpApiGateway = new HttpApi(this, "cognito-serverless-api", {
      corsPreflight: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
        ],
        allowOrigins: ["http://localhost:3000"],
      },
    });

    // Cognito UserPool
    const userPool = new UserPool(this, "cognito-serverless-userpool", {
      selfSignUpEnabled: false,
      standardAttributes: {
        email: { required: true, mutable: true },
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const userPoolClient = userPool.addClient(
      "cognito-serverless-userpool-client",
      {
        authFlows: {
          adminUserPassword: true,
          userSrp: true,
        },
        supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      }
    );

    // Authorizer
    const authorizer = new HttpUserPoolAuthorizer(
      "cognito-serverless-authorizer",
      userPool,
      { userPoolClients: [userPoolClient] }
    );

    // Http Lambda Integration
    const listTodosIntegration = new HttpLambdaIntegration(
      "cognito-serverless-list-todos-integration",
      listTodosLambda
    );

    // Api routes
    httpApiGateway.addRoutes({
      path: "/todos",
      methods: [HttpMethod.GET],
      authorizer,
      integration: listTodosIntegration,
    });

    // CfnOutput
    new CfnOutput(this, "cognito-serverless api endpoint", {
      value: httpApiGateway.apiEndpoint,
    });
  }
}
