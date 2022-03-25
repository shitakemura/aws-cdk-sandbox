import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as BackendApi from "../lib/backend-api-stack";

// example test. To run these tests, uncomment this file along with the
// example resource in lib/backend-api-stack.ts
test("Backend Api Stack Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new BackendApi.BackendApiStack(app, "MyTestStack");
  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::SQS::Queue", 0);
});
