import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { ContainerImage, Cluster } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";

export class HelloEcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "HelloEcsVpc", {
      maxAzs: 2,
    });

    // Cluster
    const cluster = new Cluster(this, "HelloEcsCluster", {
      vpc: vpc,
    });

    // Load-balanced Fargate Service
    new ApplicationLoadBalancedFargateService(this, "HelloEcsFargateService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 2,
      taskImageOptions: {
        image: ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      },
      publicLoadBalancer: true,
    });
  }
}
