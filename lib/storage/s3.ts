import "server-only";

import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type S3Object = {
  key: string;
  size: number;
  lastModified: Date | null;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for S3 content storage.`);
  }
  return value;
}

export function hasS3Config() {
  return Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY);
}

export function getS3Bucket() {
  return requiredEnv("S3_BUCKET");
}

export function getS3PublicUrl(key: string) {
  const base = process.env.S3_PUBLIC_BASE_URL;
  if (base) {
    return `${base.replace(/\/$/, "")}/${key}`;
  }

  return `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT || "http://127.0.0.1:3900",
  region: process.env.S3_REGION || "garage",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "missing",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "missing",
  },
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
});

export async function getObjectText(key: string) {
  const response = await s3.send(new GetObjectCommand({ Bucket: getS3Bucket(), Key: key }));
  return response.Body?.transformToString() || "";
}

export async function getObject(key: string) {
  return s3.send(new GetObjectCommand({ Bucket: getS3Bucket(), Key: key }));
}

export async function getObjectJson<T>(key: string, fallback: T) {
  try {
    return JSON.parse(await getObjectText(key)) as T;
  } catch (error) {
    const name = error instanceof Error ? error.name : "";
    if (name === "NoSuchKey" || name === "NotFound") return fallback;
    return fallback;
  }
}

export async function putObject(key: string, body: string | Uint8Array, contentType: string) {
  await s3.send(
    new PutObjectCommand({
      Bucket: getS3Bucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

export async function deleteObject(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: getS3Bucket(), Key: key }));
}

export async function listObjects(prefix: string): Promise<S3Object[]> {
  const objects: S3Object[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: getS3Bucket(),
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    for (const item of response.Contents || []) {
      if (!item.Key) continue;
      objects.push({
        key: item.Key,
        size: item.Size || 0,
        lastModified: item.LastModified || null,
      });
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return objects;
}
