/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEventHandler, useState } from "react";
import ImagePreview from "./ImagePreview";

const fileToData = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);    
  });
}

function App() {
  const [previewimageSrc, setPreviewImageSrc ] = useState<string>();

  const handleChangedFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    const filename = await fileToData(file);
    setPreviewImageSrc(filename);
  }

  const handleClose = () => setPreviewImageSrc(undefined);

  return (
    <>
      <input type="file" title="upload preview image" accept="image/*" onChange={handleChangedFile}/>
      {previewimageSrc && <ImagePreview imageSrc={previewimageSrc} onClose={handleClose}/>}
    </>
  );
}

export default App