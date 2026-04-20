"use client";

import { useEffect, useState } from "react";

type Announcement = {
  _id: string;
  type: "image" | "video";
  title: string;
  desc: string;
  key: string;
  fileUrl?: string;
};

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // ================= FETCH =================
  const fetchAnnouncements = async () => {
    const res = await fetch("/api/get-announcements");
    const data = await res.json();

    const updated = await Promise.all(
      data.map(async (item: Announcement) => {
        const res = await fetch("/api/get-file-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: item.key }),
        });

        const { url } = await res.json();

        return {
          ...item,
          fileUrl: url,
        };
      })
    );

    setAnnouncements(updated);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      // 1. Get signed URL
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { url } = await res.json();

      // 2. Upload to S3
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // 3. Save to DB
      const type = file.type.startsWith("video") ? "video" : "image";

      await fetch("/api/save-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          desc,
          key: file.name,
        }),
      });

      alert("Uploaded successfully!");

      // RESET
      setFile(null);
      setPreview(null);
      setTitle("");
      setDesc("");

      fetchAnnouncements();

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string, key: string) => {
    if (!confirm("Delete this announcement?")) return;

    await fetch("/api/delete-announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, key }),
    });

    fetchAnnouncements();
  };

  // ================= PREVIEW =================
  const handleFileChange = (file: File | null) => {
    setFile(file);
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Upload</h1>

      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {/* PREVIEW */}
      {preview && (
        <div className="mb-4">
          {file?.type.startsWith("video") ? (
            <video src={preview} className="h-40" controls />
          ) : (
            <img src={preview} className="h-40 object-cover" />
          )}
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-4"
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 border mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* ================= LIST ================= */}
      <h2 className="text-2xl font-bold mt-10 mb-6">
        Uploaded Announcements
      </h2>

      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
            >
              {/* MEDIA */}
              <div className="h-48 w-full overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.fileUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.fileUrl}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#444444] line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* ACTION */}
                <button
                  onClick={() => handleDelete(item._id, item.key)}
                  className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}