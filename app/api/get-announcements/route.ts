import { connectDB } from "@/lib/mongodb";
import Announcement from "../../../models/Annoncements";

export async function GET() {
  await connectDB();

  const data = await Announcement.find().sort({ createdAt: -1 });

  return Response.json(data);
}