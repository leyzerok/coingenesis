// components/ImageUpload.tsx
"use client";

import { useState } from 'react';

const ImageUpload = (
    {setUrl} : {setUrl: (url: string) => void}
) => {
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append('file', fileToUpload);
      const res = await fetch('/api/files', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      const resData = await res.json();
      const cid = resData.IpfsHash;
      setImageURL(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`);
      setUrl(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      uploadFile(selectedFile);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleChange} />
      {uploading && <p>Uploading...</p>}      
    </div>
  );
};

export default ImageUpload;
