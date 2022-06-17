import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class StepfunctionsSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const taskFn = new Function(this, 'TaskFn', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('handlers'),
      handler: 'task.handler',
    });

    const firstState = new LambdaInvoke(this, '最初の処理', {
      lambdaFunction: taskFn,
      outputPath: '$.Payload',
    });

    const secondState = new LambdaInvoke(this, '次の処理', {
      inputPath: '$.message',
      lambdaFunction: taskFn,
    });

    const definition = firstState.next(secondState);

    new StateMachine(this, 'stateMachine', {
      definition: definition,
    });
  }
}
