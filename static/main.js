const video = document.getElementById('webcam');
const socket = new WebSocket('ws://localhost:5000/websocket');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened:', event);

  // Request camera permission and start the video stream
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
        sendFrames();
      });
    })
    .catch((error) => {
      console.error('Error accessing webcam:', error);
    });
});

function sendFrames() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  setInterval(() => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL('image/jpeg', 0.8);
    socket.send(frame);
  }, 1000 / 30); // Send frames at 30 FPS
}
