import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.NEW_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEW_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEW_AWS_SECRET_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.NEW_AWS_BUCKET_NAME!,
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return Response.json({ url });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}