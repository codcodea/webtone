export function getContrastHex(rgb: [number, number, number]): string {
    // Calculate luminance
    const luminance = (r: number, g: number, b: number): number => {
        const a = [r, g, b].map(value => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };

    // Extract RGB components
    const [r, g, b] = rgb;

    // Calculate luminance of RGB
    const luma = luminance(r, g, b);

    // Decide on contrast
    return luma >= 0.15 ? '#353535' : '#eeeeee';
}

export const checkContrast = (color: string) => {
    const hex = color.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "black" : "white"
}


