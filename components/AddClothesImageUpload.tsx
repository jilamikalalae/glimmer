import { UploadDropzone } from "@/utils/uploadthing";
import React, { useState } from "react";

interface AddClothesImageUploadProps {
  onUploadComplete: (url: string) => void; 
}

const AddClothesImageUpload: React.FC<AddClothesImageUploadProps> = ({ onUploadComplete }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="flex flex-col">
      <UploadDropzone
        appearance={{
          container: {
            border: '1px solid grey',
            width: '100%', // Make it full width
            maxWidth: '400px', // Set a max width
            height: 'auto', // Make the height auto
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const url = res[0].url;
          setImageUrl(url);
          onUploadComplete(url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full max-w-[400px] h-auto object-contain" // Make the image responsive
          />
        </div>
      )}
    </div>
  );
};

export default AddClothesImageUpload;
