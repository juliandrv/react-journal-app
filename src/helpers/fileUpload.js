// helpers/fileUpload.js

export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/juliandrv/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('Cannot upload image');

    const cloudResp = await resp.json();

    return {
      secure_url: cloudResp.secure_url,
      public_id: cloudResp.public_id,
    };
  } catch (error) {
    console.error('Error uploading image', error);
    return null;
  }
};
