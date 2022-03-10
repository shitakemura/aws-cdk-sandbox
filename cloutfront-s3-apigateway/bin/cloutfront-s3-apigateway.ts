#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CloutfrontS3ApigatewayStack } from "../lib/cloutfront-s3-apigateway-stack";

const app = new cdk.App();
new CloutfrontS3ApigatewayStack(app, "CloutfrontS3ApigatewayStack", {});
