import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";

interface ChuckStackProps extends cdk.StackProps {
  lambdaVersionArn: string;
}
export class ChuckStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ChuckStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "ChuckBucket", {
      bucketName: "chuckie-wisdoms",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const oac = new cloudfront.S3OriginAccessControl(this, "MyOAC", {
      description: "S3-OAC",
      signing: cloudfront.Signing.SIGV4_ALWAYS,
    });

    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(bucket, {
      originAccessControl: oac,
    });

    const lambdaVersion = lambda.Version.fromVersionArn(
      this,
      "ImportedLambdaVersion",
      props.lambdaVersionArn
    );

    const distribution = new cloudfront.Distribution(
      this,
      "ChuckieWisdomsDistribution",
      {
        comment: "CDK-Chuckie",
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        defaultBehavior: {
          origin: s3Origin,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
          edgeLambdas: [
            {
              functionVersion: lambdaVersion,
              eventType: cloudfront.LambdaEdgeEventType.VIEWER_RESPONSE,
              includeBody: false,
            },
          ],
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 404,
            responsePagePath: "/404.html",
          },
        ],
      }
    );

    const bucketPolicy = new s3.BucketPolicy(this, "BucketPolicy", {
      bucket: bucket,
    });

    bucketPolicy.document.addStatements(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        resources: [`${bucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      })
    );
  }
}
