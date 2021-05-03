// script.js

const img = new Image(); // used to load image from <input> and draw to canvas



const canvas = document.getElementById('user-image');
const ctx = canvas.getContext('2d');

ctx.font = '69px Georgia';
ctx.textAlign = 'center';


const clearButton = document.getElementById('button-group').children[0];
const readButton = document.getElementById('button-group').children[1];
const generateButton = document.getElementById('generate-meme').children[6];

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  ctx.fillStyle = 'black';
  //clear canvas context
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //toggle relevant buttons by disabling / enabling them
  generateButton.disabled = false;
  clearButton.disabled = true;
  readButton.disabled = true;

  //fill canvas content with black to add borders
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //draw uploaded image onto canvas with correct width heightt startX and startY using getDimensions
  var dimensions = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, dimensions.startX, dimensions.startY, dimensions.width, dimensions.height);

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

const imageInput = document.getElementById('image-input');

imageInput.addEventListener('change', () => {

  img.src = URL.createObjectURL(document.getElementById("image-input").files[0]);
  img.alt = document.getElementById("image-input").files[0].name;
});

const generateForm = document.getElementById('generate-meme');

generateForm.addEventListener('submit', (event) => {
  //grab top/bottom text
  event.preventDefault();
  const topText = document.getElementById('text-top').value;
  const bottomText = document.getElementById('text-bottom').value;
  
  //write to canvas
  ctx.fillStyle = 'white';
  
  //write toptext
  ctx.fillText(topText, canvas.width/2, 59);
  ctx.strokeText(topText, canvas.width/2, 59);
  //write bottomtext
  ctx.fillText(bottomText, canvas.width/2, canvas.height-10);
  ctx.strokeText(bottomText, canvas.width/2, canvas.height-10);

  //toggle buttons
  generateButton.disabled = true;
  clearButton.disabled = false;
  readButton.disabled = false;
});

clearButton.addEventListener('click', () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //revert buttons
  generateButton.disabled = false;
  clearButton.disabled = true;
  readButton.disabled = true;
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
