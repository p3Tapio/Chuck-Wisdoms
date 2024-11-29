import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";

export class S3Stack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ACCOUNT_ID = cdk.Stack.of(this).account;

    this.bucket = new s3.Bucket(this, "StaticWebsiteBucket", {
      bucketName: "chuckie-wisdoms",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    /*
    const bucketPolicy = new s3.BucketPolicy(this, "BucketPolicy", {
      bucket: this.bucket,
    });

    bucketPolicy.document.addStatements(
      new iam.PolicyStatement({
        sid: "2",
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        actions: ["s3:GetObject"],
        resources: [this.bucket.arnForObjects("*")],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${ACCOUNT_ID}:distribution/YOUR_DISTRIBUTION_ID`,
          },
        },
      })
    );
    */
  }
}
