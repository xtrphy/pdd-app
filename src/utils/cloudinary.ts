export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'avatars')

    const res = await fetch('https://api.cloudinary.com/v1_1/dab77oux4/image/upload', {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) throw new Error('Error loading')

    return await res.json()
}