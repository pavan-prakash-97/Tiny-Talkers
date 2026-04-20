// import { connectDB } from "@/lib/mongodb";
// import Announcement from "../../../models/Annoncements";
// // import Announcement from "@/models/Announcement";

// export async function POST(req: Request) {

//        console.log("API HIT ✅");

//     await connectDB();

//     const body = await req.json();
//     console.log("BODY:", body);
// //   await connectDB();

// //   const body = await req.json();

//   const newData = await Announcement.create({
//     type: body.type,
//     title: body.title,
//     desc: body.desc,
//     fileUrl: body.fileUrl,
//   });

//   return Response.json({ success: true, data: newData });
// }

import { connectDB } from "@/lib/mongodb";
import Announcement from "@/models/Annoncements";

export async function POST(req: Request) {
  try {
    await connectDB();
console.log("API HIT ✅");
    const { type, title, desc, key } = await req.json();

    if (!key) {
      return Response.json({ error: "Key missing" }, { status: 400 });
    }

    const newData = await Announcement.create({
      type,
      title,
      desc,
      key, // ✅ SAVE KEY (NOT URL)
    });

    return Response.json({ success: true, data: newData });

  } catch (err) {
    console.error("SAVE ERROR:", err);
    return Response.json({ error: "DB error" }, { status: 500 });
  }
}