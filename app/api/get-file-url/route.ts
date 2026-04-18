// // app/api/get-file-url/route.ts

// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({
//   region: "eu-north-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY!,
//     secretAccessKey: process.env.AWS_SECRET_KEY!,
//   },
// });

// export async function POST(req: Request) {
//   const { key } = await req.json();

//   const command = new GetObjectCommand({
//     Bucket: "tiny-talkers-bucket",
//     Key: key,
//   });

//   const url = await getSignedUrl(s3, command, {
//     expiresIn: 3600, // 1 hour
//   });

//   return Response.json({ url });
// }

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return Response.json({ error: "Key missing" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    return Response.json({ url });

  } catch (err) {
    console.error("GET URL ERROR:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}