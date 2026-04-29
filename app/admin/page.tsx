"use client";

import { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ================= RESET FORM =================
  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setDesc("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ================= IMAGE OPTIMIZATION =================
  const optimizeImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.3, // 🔥 ~300KB
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    return new File([compressedFile], file.name, {
      type: "image/webp",
    });
  };

  // ================= VIDEO OPTIMIZATION =================
  const optimizeVideo = async (file: File): Promise<File> => {
    // NOTE: Browser-side video compression is limited
    // This keeps file as-is but allows future enhancement
    const buffer = await file.arrayBuffer();

    return new File([buffer], file.name, {
      type: "video/mp4",
    });
  };

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
      }),
    );

    setAnnouncements(updated);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAnnouncements();
    };

    loadData();
  }, []);

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      let optimizedFile = file;

      if (file.type.startsWith("image")) {
        optimizedFile = await optimizeImage(file);
      } else if (file.type.startsWith("video")) {
        optimizedFile = await optimizeVideo(file);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: optimizedFile.name,
          fileType: optimizedFile.type,
        }),
      });

      if (!res.ok) throw new Error("Failed to get upload URL");

      const { url } = await res.json();

      const uploadRes = await fetch(url, {
        method: "PUT",
        body: optimizedFile,
        headers: { "Content-Type": optimizedFile.type },
      });

      if (!uploadRes.ok) throw new Error("Upload to S3 failed");

      const type = optimizedFile.type.startsWith("video") ? "video" : "image";

      const saveRes = await fetch("/api/save-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          desc,
          key: optimizedFile.name,
        }),
      });

      if (!saveRes.ok) throw new Error("Saving data failed");

      // ✅ SUCCESS
      alert("✅ Upload successful!");

      resetForm(); // 🔥 FULL RESET
      fetchAnnouncements();
    } catch (err) {
      console.error(err);

      // ❌ FAILURE
      alert("❌ Upload failed. Please try again.");

      resetForm(); // optional: keeps UX clean
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

      {/* <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="mb-4"
      /> */}
      <input
        type="file"
        ref={fileInputRef}
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
      <h2 className="text-2xl font-bold mt-10 mb-6">Uploaded Announcements</h2>

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
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.fileUrl}
                    preload="metadata"
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