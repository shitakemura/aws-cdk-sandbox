import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Bucket } from "aws-cdk-lib/aws-s3";
import {
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";
import * as path from "path";

export class CloutfrontS3ApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda
    const listTodosLambda = new NodejsFunction(this, "cf-s3-api-lambda", {
      entry: path.join(__dirname, "../lambda/listTodos.ts"),
      handler: "handler",
    });

    // HTTP API Gateway
    const todoHttpApi = new HttpApi(this, "cf-s3-api");

    // Lambda Integration
    const listTodosIntegration = new HttpLambdaIntegration(
      "cf-s3-api-integration",
      listTodosLambda
    );

    // API Routes
    todoHttpApi.addRoutes({
      path: "/api/todos",
      methods: [HttpMethod.GET],
      integration: listTodosIntegration,
    });

    // S3
    const todoBucket = new Bucket(this, "cf-s3-api-bucket", {
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // OAI
    const todoOAI = new OriginAccessIdentity(this, "cf-s3-api-oai");
    todoBucket.grantRead(todoOAI);

    // CloudFront WebDestribution
    const todoWebDestribution = new CloudFrontWebDistribution(
      this,
      "cf-s3-api-web-destribution",
      {
        originConfigs: [
          // API Gateway
          {
            customOriginSource: {
              domainName: `${todoHttpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
            },
            behaviors: [
              {
                pathPattern: "/api/*",
                allowedMethods: CloudFrontAllowedMethods.ALL,
                defaultTtl: Duration.seconds(0),
                forwardedValues: {
                  queryString: true,
                  headers: ["Authorization"],
                },
              },
            ],
          },
          // S3
          {
            s3OriginSource: {
              s3BucketSource: todoBucket,
              originAccessIdentity: todoOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );
  }
}
