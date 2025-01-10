#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ChuckStack } from "../lib/chuck-stack";

const app = new cdk.App();
new ChuckStack(app, "ChuckieWisdomsStack");
