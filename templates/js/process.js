const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Apply image processing operation
function processImage() {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Invert colors (simple example)
    data[i] = 255 - data[i];    // red
    data[i + 1] = 255 - data[i + 1];  // green
    data[i + 2] = 255 - data[i + 2];  // blue
  }
  context.putImageData(imageData, 0, 0);
}

// Call image processing function on button click
const button = document.getElementById('button');
button.addEventListener('click', function () {
  processImage();
});
