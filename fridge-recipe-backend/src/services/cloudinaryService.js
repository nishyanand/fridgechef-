import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('✅ Cloudinary configured successfully');

/**
 * Upload image buffer to Cloudinary with automatic format conversion
 * Converts all images to JPEG for OpenAI compatibility
 */
export const uploadToCloudinary = async (buffer, filename) => {
  try {
    // Convert image to JPEG using Sharp (handles AVIF, HEIC, WebP, etc.)
    console.log('🔄 Converting image to JPEG format...');
    const jpegBuffer = await sharp(buffer)
      .jpeg({ quality: 90 })
      .toBuffer();
    
    console.log('✅ Image converted to JPEG');

    // Convert buffer to base64 for Cloudinary upload
    const base64Image = `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'fridgechef',
      resource_type: 'image',
      public_id: `fridge_${Date.now()}`,
      format: 'jpg',
      quality: 'auto:good',
      transformation: [
        {
          width: 2000,
          height: 2000,
          crop: 'limit'
        }
      ]
    });

    console.log('✅ Cloudinary upload successful:', {
      url: uploadResult.secure_url,
      format: uploadResult.format,
      size: uploadResult.bytes
    });

    return uploadResult;

  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('🗑️  Deleted from Cloudinary:', publicId);
    return result;
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;