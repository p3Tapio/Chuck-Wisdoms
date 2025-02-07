import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LambdaStack extends cdk.Stack {
  public readonly lambdaVersionArn: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const headerFunctionRole = new iam.Role(this, "LambdaEdgeRole", {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal("lambda.amazonaws.com"),
        new iam.ServicePrincipal("edgelambda.amazonaws.com")
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    const headerFunction = new lambda.Function(this, "ChuckHeaders", {
      role: headerFunctionRole,
      architecture: lambda.Architecture.X86_64,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("./lambda"),
      memorySize: 128,
      timeout: cdk.Duration.seconds(3),
      logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK,
      description: 'ChuckHeaderFunction'
    });

    const lambdaVersion = new lambda.Version(this, "ChuckHea-dersVersion", {
      lambda: headerFunction,
    });

    this.lambdaVersionArn = lambdaVersion.functionArn;
  }
}
