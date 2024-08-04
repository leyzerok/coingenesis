// components/ImageUpload.tsx
"use client";

import { useState } from 'react';

const ImageUpload = (
    { setUrl }: { setUrl: (url: string) => void }
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
            const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`;
            setImageURL(url);
            setUrl(url);
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
        <div className="flex flex-col items-center p-6 rounded-lg shadow-md space-y-4">
            <label className="w-full flex flex-col items-center bg-white p-2 rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-200">
                <span className="text-base leading-normal">Upload logo</span>
                <input type="file" className="hidden" onChange={handleChange} />
            </label>
            {uploading && <p className="text-black">Uploading...</p>}
            {imageURL && (
                <div className="flex flex-col items-center space-y-2">
                    <img src={imageURL} alt="Uploaded" className="w-32 h-32 object-cover shadow-lg" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
