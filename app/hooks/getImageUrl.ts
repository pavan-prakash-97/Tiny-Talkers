export const getImageUrl = async (fileUrl: string) => {
  try {
    console.log('HIT fileUrl', fileUrl)
    const key = decodeURIComponent(fileUrl.split(".amazonaws.com/")[1]);
    
    const res = await fetch("/api/get-file-url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
    });
    
    console.log('HIT key', key)
    console.log('HIT res', res)
    if (!res.ok) throw new Error("Failed to get signed URL");

    const data = await res.json();
    return data.url;
  } catch (err) {
    console.error("❌ Signed URL Error:", err);
    return null;
  }
};