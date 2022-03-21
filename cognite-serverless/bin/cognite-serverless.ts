#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CogniteServerlessStack } from "../lib/cognite-serverless-stack";

const app = new cdk.App();
new CogniteServerlessStack(app, "CogniteServerlessStack", {});
