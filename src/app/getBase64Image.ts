export default async function getBase64Image(file: File | null): Promise<string> {
    if (!file) {
        return '';
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Error reading file'));
    });
}