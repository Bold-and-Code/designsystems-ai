// Client-side image color extraction using Canvas API
// No server-side dependencies needed

/**
 * Extract dominant colors from an image file using Canvas pixel sampling.
 * Returns an array of hex colors sorted by frequency.
 */
export async function extractColorsFromImage(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        // Sample at reduced resolution for performance
        const maxDim = 100;
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Quantize colors into buckets
        const colorMap = new Map<string, number>();

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          // Skip transparent pixels
          if (a < 128) continue;

          // Quantize to reduce noise (round to nearest 16)
          const qr = Math.round(r / 16) * 16;
          const qg = Math.round(g / 16) * 16;
          const qb = Math.round(b / 16) * 16;

          const hex = `#${clamp(qr).toString(16).padStart(2, "0")}${clamp(qg).toString(16).padStart(2, "0")}${clamp(qb).toString(16).padStart(2, "0")}`;

          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }

        // Sort by frequency, filter boring colors
        const sorted = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([color]) => color)
          .filter((c) => {
            // Filter near-white, near-black, and pure gray
            const r = parseInt(c.slice(1, 3), 16);
            const g = parseInt(c.slice(3, 5), 16);
            const b = parseInt(c.slice(5, 7), 16);
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            // Keep if it has some saturation or is a medium gray
            return (saturation > 0.1 || (max > 40 && max < 220)) && max - min < 250;
          });

        resolve(sorted.slice(0, 8));
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}
