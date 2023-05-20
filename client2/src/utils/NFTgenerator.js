const { createCanvas, loadImage } = require('canvas');

const json = {
  "name": "Rcookie777",
  "address": "0x12345678901234567890",
};

const imagePath = './NFT.png';

const generateModifiedImage = async () => {
  const image = await loadImage(imagePath);

  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');

  context.drawImage(image, 0, 0);

  context.font = '20px Arial'; // Set the font properties
  context.fillStyle = 'red'; // Set the text color

  const text = json.name;
  const address = json.address;

  const textX = canvas.width / 2; // X coordinate for the text
  const textY = canvas.height / 2; // Y coordinate for the text

  const addressX = textX; // X coordinate for the address
  const addressY = textY + 30; // Y coordinate for the address

  context.textAlign = 'center'; // Center the text
  context.fillText('github', textX, textY - 20); // Draw "github" above the text
  context.fillText(text, textX, textY); // Draw the text in the middle
  context.fillText(address, addressX, addressY); // Draw the address below the text

  const modifiedImageBuffer = canvas.toBuffer('image/png');
  // Save the modified image to a file or perform further operations

  // Example: Save the modified image to a file
  const fs = require('fs');
  fs.writeFileSync('modifiedImage.png', modifiedImageBuffer);
};

generateModifiedImage();
