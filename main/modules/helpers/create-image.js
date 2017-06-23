export default function createImage(data, type = 'image/jpg') {
    const blob = new Blob([data], { type: type });
    return URL.createObjectURL(blob);
}
//# sourceMappingURL=create-image.js.map