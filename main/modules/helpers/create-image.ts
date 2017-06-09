export default function createImage(data: Uint8Array, type = 'image/jpg') {
    const blob = new Blob([data], { type: type });
    return URL.createObjectURL(blob);
}