import fs from "fs";
import AWS, { S3 } from "aws-sdk";
import { UploadedFile } from "adminjs";
import { BaseProvider } from "@adminjs/upload";
import { ERROR_MESSAGES, DAY_IN_MINUTES } from "./constants";

type DigitalOceanOptions = {
  /**
   * AWS IAM accessKeyId. By default its value is taken from AWS_ACCESS_KEY_ID env variable
   */
  endpoint: string;

  accessKeyId?: string;
  /**
   * AWS IAM secretAccessKey. By default its value is taken from AWS_SECRET_ACCESS_KEY env variable
   */
  secretAccessKey?: string;
  /**
   * AWS region where your bucket was created.
   */
  region: string;
  /**
   * S3 Bucket where files will be stored
   */
  bucket: string;
  /**
   * indicates how long links should be available after page load (in minutes).
   * Default to 24h. If set to 0 adapter will mark uploaded files as PUBLIC ACL.
   */
  expires?: number;
};

export class DigitalOceanProvider extends BaseProvider {
  private s3: S3;

  public expires: number;

  public region: string;

  constructor(options: DigitalOceanOptions) {
    super(options.bucket);

    let AWS_S3: typeof S3;
    try {
      AWS_S3 = AWS.S3;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NO_AWS_SDK);
    }
    this.expires = options.expires || DAY_IN_MINUTES;
    this.region = options.region;
    const spacesEndpoint = new AWS.Endpoint(options.endpoint);

    this.s3 = new AWS_S3({
      endpoint: spacesEndpoint,
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      region: options.region,
    });
  }

  public async upload(
    file: UploadedFile,
    key: string
  ): Promise<S3.ManagedUpload.SendData> {
    const uploadOptions = { partSize: 5 * 1024 * 1024, queueSize: 10 };
    const tmpFile = fs.createReadStream(file.path);
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: tmpFile,
      ACL: "public-read",
    };
    const value = await this.s3.upload(params, uploadOptions).promise();
    return value;
  }

  public async delete(
    key: string,
    bucket: string
  ): Promise<S3.DeleteObjectOutput> {
    return this.s3.deleteObject({ Key: key, Bucket: bucket }).promise();
  }

  public async path(key: string, bucket: string): Promise<string> {
    const isImage = !key.includes("pdf");
    const isPDF = key.includes("pdf");

    const PRODUCTS_FOLDER = "products";
    const ATTACHMENT_FOLDER = "adjuntos";

    // key is image and does not contain asset path /products in it
    if (isImage && !key.includes(PRODUCTS_FOLDER)) {
      const path = `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/products/${key}`;
      return path;
    }

    // key is pdf and does not contain asset path /adjuntos in it
    if (isPDF && !key.includes(ATTACHMENT_FOLDER)) {
      const path = `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/adjuntos/${key}`;
      return path;
    }
    // key contains full asset url path cdn endpoint plus folder in it
    if (key.includes("https")) {
      const path = `${key}`;
      return path;
    }
    // key contains folder path /products or /adjuntos
    const path = `https://${bucket}.${this.region}.cdn.digitaloceanspaces.com/${key}`;
    return path;
  }
}
