#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CloudfrontS3ApigatewayStack } from "../lib/cloudfront-s3-apigateway-stack";

const app = new cdk.App();
new CloudfrontS3ApigatewayStack(app, "CloudfrontS3ApigatewayStack", {});
