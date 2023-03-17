# Step 1: Install Nginx and Gunicorn

To get started, you'll need to install Nginx and Gunicorn on your Linux server. You can do this by running the following commands:

```
sudo apt update
sudo apt install nginx python3-pip
sudo pip3 install gunicorn
```
These commands will update your package list, install Nginx and Python3 pip, and then use pip to install Gunicorn.
# Step 2: Clone the project repository

Once you have installed Nginx and Gunicorn, you can clone the project repository to your server using Git. If you haven't already installed Git, you can do so with the following command:
```
sudo apt install git
```
Next, navigate to the directory where you want to clone the repository and run the following command:
```
git clone https://github.com/minhpbvt/walleye.git
```
# Step 3: Set up a Python virtual environment

Before installing the project dependencies, it's a good idea to set up a Python virtual environment to keep them isolated from other Python projects on your server. To do this, navigate to the project directory and run the following commands:
```
cd walleye
python3 -m venv env
source env/bin/activate
```
The first command creates a new virtual environment in a directory called `env` within the project directory. The second command activates the virtual environment, which changes your shell's Python interpreter to use the one installed in the virtual environment. Once the virtual environment is activated, you can install the project dependencies without affecting other Python projects on your server.
# Step 4: Install project dependencies

With the virtual environment activated, you can now install the project dependencies listed in the `requirements.txt` file. Run the following command from the project directory:
```
pip3 install -r requirements.txt
```
This will install all the necessary Python packages required to run the application.
# Step 5: Configure Nginx

Next, you need to configure Nginx to serve your application. Begin by creating a new Nginx configuration file in the `/etc/nginx/sites-available` directory with the following command:

```
sudo nano /etc/nginx/sites-available/walleye
```

In this file, paste the following configuration:
```
server {
    listen 80;
    server_name YOUR_DOMAIN_NAME;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        alias /path/to/project/static;
    }
}

```
Replace `YOUR_DOMAIN_NAME` with your server's domain name or IP address. Also, replace `/path/to/project/static` with the absolute path to the `static` directory in your project directory.

Once you have finished editing the configuration file, save and close it. Then, create a symbolic link to this file in the `/etc/nginx/sites-enabled` directory with the following command:
```
sudo ln -s /etc/nginx/sites-available/walleye /etc/nginx/sites-enabled/
```
Finally, test the Nginx configuration with the following command:
```
sudo nginx -t && nginx -s reload
```
If the configuration is valid, restart Nginx with the following command:
```
sudo systemctl restart nginx
```
Your application is now accessible through Nginx at `http://YOUR_DOMAIN_NAME/`.
# Step 6: Configure Gunicorn

Gunicorn is a Python WSGI HTTP server that will serve your Flask application. Begin by creating a new systemd service file for Gunicorn with the following command:
```
sudo nano /etc/systemd/system/myapp.service
```
In this file, paste the following configuration:
```
[Unit]
Description=Gunicorn instance to serve myapp
After=network.target

[Service]
User=YOUR_USERNAME
Group=www-data
WorkingDirectory=/path/to/project
Environment="PATH=/path/to/project/env/bin"
ExecStart=/path/to/project/env/bin/gunicorn --workers 3 --bind unix:/path/to/project/myapp.sock wsgi:app

[Install]
WantedBy=multi-user.target
```
Replace `YOUR_USERNAME` with your server's username and `/path/to/project` with the absolute path to your project directory.

Once you have finished editing the service file, save and close it. Then, reload systemd to read the new service file with the following command:
```
sudo systemctl daemon-reload
```
Finally, start the Gunicorn service with the following command:
```
sudo systemctl start myapp
```
Your Flask application is now running with Gunicorn and accessible through Nginx.
# Step 7: Test the application

To test your application, open a web browser and navigate to `http://YOUR_DOMAIN_NAME/`. If everything is working correctly, you should see a page that displays the video stream from your webcam.

To test the image processing functionality, click the "Capture" button to take a snapshot of the current video frame. Then, click the "Process" button to process the captured image using OpenCV. If everything is working correctly, you should see the processed image displayed on the page.

To test the image upload functionality, click the "Choose File" button and select an image file from your local filesystem. Then, click the "Upload" button to upload the selected image to the server. If everything is working correctly, you should see the uploaded image displayed on the page with its appropriate result.

Congratulations, your application is now up and running

# Here's a summary of the necessary files for the project:

•`index.html`: This file contains the HTML code for the webpage that displays the video feed from the webcam and allows the user to upload an image.

•`style.css`: This file contains the CSS code for styling the HTML elements in index.html.

•`camera.js`: This file contains the JavaScript code for capturing video from the user's webcam and rendering it on a canvas element.

•`upload.js`: This file contains the JavaScript code for uploading an image selected by the user to the server using an XMLHttpRequest.

•`process.js`: This file contains the JavaScript code for receiving the processed image from the server and rendering it on a canvas element.

•`app.py`: This file contains the Flask application code for processing image uploads and serving the processed images.

•`wsgi.py`: This file imports your Flask application and runs it using Gunicorn.

•`requirements.txt`: This file contains a list of all the Python packages that need to be installed using a package manager like pip.

•`nginx.conf`: This file contains the Nginx configuration for serving the static files and proxying requests to the Gunicorn server.
