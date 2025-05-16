export const useFileUpload = (setSelectedFile) => {
    const uploadFiles = (fileInputRef) => {
      if (!fileInputRef?.current) return;
  
      fileInputRef.current.click();
  
      fileInputRef.current.onchange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
          setSelectedFile(file);
        }
      };
    };
  
    return { uploadFiles };
};