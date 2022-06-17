import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  Parallel,
  StateMachine,
  Wait,
  WaitTime,
} from 'aws-cdk-lib/aws-stepfunctions';
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

    const wait10 = new Wait(this, '10秒待つ', {
      time: WaitTime.duration(Duration.minutes(10)),
    });

    const parallel = new Parallel(this, 'Parallel');
    parallel.branch(firstState, secondState).next(wait10);

    const definition = parallel;

    new StateMachine(this, 'stateMachine', {
      definition: definition,
    });
  }
}
