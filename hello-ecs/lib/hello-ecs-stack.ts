import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";

export class HelloEcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // VPC

    // Cluster

    new ApplicationLoadBalancedFargateService(this, "MyWebServer", {
      taskImageOptions: {
        image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      },
      publicLoadBalancer: true,
    });
  }
}
