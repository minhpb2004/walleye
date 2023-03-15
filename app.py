from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import base64

app = Flask(__name__)

# Serve index.html file
@app.route('/')
def index():
    return render_template('index.html')

# Process uploaded image and return result
@app.route('/process', methods=['POST'])
def process():
    # Get image data from request
    data = request.form['image'].split(',')[1]
    image_data = base64.b64decode(data)
    
    # Convert image data to OpenCV format
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Apply image processing operation (inverted colors)
    img = cv2.bitwise_not(img)
    
    # Convert image data back to base64-encoded string
    _, buffer = cv2.imencode('.jpg', img)
    img_data = base64.b64encode(buffer).decode('utf-8')
    
    # Return processed image
    return jsonify({'image': img_data})

if __name__ == '__main__':
    app.run()
