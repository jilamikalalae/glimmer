import { UploadDropzone } from "@/utils/uploadthing";
import React, { useState } from "react";

interface EditClothesImageUploadProps {
  onUploadComplete: (url: string) => void; 
}

const EditClothesImageUpload: React.FC<EditClothesImageUploadProps> = ({ onUploadComplete }) => {

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
          onUploadComplete(url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default EditClothesImageUpload;
