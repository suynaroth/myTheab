import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "public/images";
const outputDir = "public/images_compressed";

fs.mkdirSync(outputDir, { recursive: true });

async function compressImagesRecursively(folderPath, outputFolder) {
  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const item of items) {
    const inputPath = path.join(folderPath, item.name);
    const outputPath = path.join(outputFolder, item.name);

    if (item.isDirectory()) {
      fs.mkdirSync(outputPath, { recursive: true });
      await compressImagesRecursively(inputPath, outputPath);
    } else if (/\.(jpg|jpeg)$/i.test(item.name)) {
      try {
        await sharp(inputPath)
          .jpeg({
            quality: 65,          // lower = smaller
            mozjpeg: true,        // use mozjpeg compression
            chromaSubsampling: '4:2:0' // reduces color info, keeps sharpness
          })
          .toFile(outputPath);
        console.log(`✅ Compressed JPEG: ${item.name}`);
      } catch (err) {
        console.error(`❌ JPEG Failed: ${item.name}`, err.message);
      }
    } else if (/\.png$/i.test(item.name)) {
      try {
        await sharp(inputPath)
          .png({
            compressionLevel: 9,  // 0–9 (higher = smaller)
            palette: true,        // use indexed palette (saves size)
            quality: 70           // balance of quality and size
          })
          .toFile(outputPath);
        console.log(`✅ Compressed PNG: ${item.name}`);
      } catch (err) {
        console.error(`❌ PNG Failed: ${item.name}`, err.message);
      }
    }
  }
}

await compressImagesRecursively(inputDir, outputDir);

console.log("🎉 All images compressed successfully!");
