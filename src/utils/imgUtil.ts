export const base64toBlob = (base64: string) => {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/png" });
};

export const blobtoimage = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result;
        return base64String;
    };

    reader.readAsDataURL(blob);
};

export const blobUrlToFileList = async (blobUrl: string, fileName = "image.png") => {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });

        // Create a DataTransfer object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Get the FileList
        return dataTransfer.files;
    } catch (error) {
        console.error("Error converting blob URL to FileList:", error);
    }
};

export const blobUrlToFile = async (blobUrl: string, fileName = "image.png") => {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    } catch (error) {
        console.error("Error converting blob URL to file:", error);
    }
};
