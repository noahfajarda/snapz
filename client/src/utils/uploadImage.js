// uploads image to cloudinary.com
// link to view images = https://console.cloudinary.com/console/c-a93be4c19875cf5fd32251bfff624e/media_library/search?q=

export default async function postDetails(image) {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "social-media-image-upload");
  data.append("cloud_name", "fajarda1storage");

  // API ROUTE = https://api.cloudinary.com/v1_1/fajarda1storage/image/upload
  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/fajarda1storage/image/upload", {
      method: "POST",
      body: data,
    })
    // image POST response data & return the image URL alone
    const imageData = await response.json();
    return imageData.url;
  } catch (err) {
    console.error(err);
  }
};