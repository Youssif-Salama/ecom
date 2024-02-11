import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryUploader = async (path) => {
    const { public_id: imageName, secure_url: imageUrl } = await cloudinary.uploader.upload(path);
    return { imageName, imageUrl };
}

export const cloudinaryDeleter = async (imageName) => {
    await cloudinary.uploader.destroy(imageName);
}
