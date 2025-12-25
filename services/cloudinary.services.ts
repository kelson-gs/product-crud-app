export const cloudinaryService = {
  async uploadImage(formData: FormData) {
    const cloudName = "dnhvevueu"

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Cloudinary error:", error)
      throw new Error(error)
    }

    const data = await response.json()

    return {
      url: data.secure_url,
      publicId: data.public_id,
    }
  },
}
