# Use the official image as a parent image.
FROM node:current

# Set the working directory.
WORKDIR usr/src/app/

# Copy the file from your host to your current location.
COPY /front-end/package.json ./front-end

#Copy the rest of our app's files into the current directory
COPY . .

#change working directory to front-end because that is what we are running
WORKDIR ./front-end

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "start" ]




#I built this out to listen on ports 8080 and then send to port 3000
#docker run --publish 3000:8080 bm-app:1.0