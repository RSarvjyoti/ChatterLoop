// Your Cloudinary cloud name
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;// Replace with your own preset

export const uploadFile = async (file) => {
  // Correct the URL structure for Cloudinary upload
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    // Create a FormData object to send file data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Fetch request to Cloudinary
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Get the response JSON
    const responseData = await response.json();
    console.log("Uploaded File:", responseData);
    return responseData;
  } catch (err) {
    console.error("Upload Error:", err);
    return null;
  }
};
