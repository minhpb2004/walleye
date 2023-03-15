const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Load selected image file
input.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      // Draw image on canvas
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});
