const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Get user's permission to access webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function (err) {
    console.log("Error getting user media:", err);
  });

// Render video frames on canvas
function render() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(render);
}

// Start rendering
render();
