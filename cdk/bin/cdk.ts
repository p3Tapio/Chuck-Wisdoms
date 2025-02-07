#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ChuckStack } from "../lib/chuck-stack";
import { LambdaStack } from "../lib/lambda-stack";

const app = new cdk.App();

const lambdaStack = new LambdaStack(app, "ChuckieLambdaStack", {
  env: { account: process.env.ACCOUNT, region: "us-east-1" },
  crossRegionReferences: true
});

const chuckStack = new ChuckStack(app, "ChuckieWisdomsStack", {
  env: { account: process.env.ACCOUNT, region: "eu-central-1" },
  crossRegionReferences: true,
  lambdaVersionArn: lambdaStack.lambdaVersionArn
});

chuckStack.addDependency(lambdaStack);
