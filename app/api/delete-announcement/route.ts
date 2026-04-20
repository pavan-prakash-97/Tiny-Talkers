// app/api/delete-announcement/route.ts

import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Annoncements";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEW_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEW_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEW_AWS_SECRET_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id, key } = await req.json();

    // Delete from S3
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.NEW_AWS_BUCKET_NAME!,
        Key: key,
      })
    );

    // Delete from MongoDB
    await Announcement.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}