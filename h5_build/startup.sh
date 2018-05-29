docker stop h5project

docker rm h5project

docker rmi h5project

docker build -t h5project .

docker run --name h5project -p 8089:3000 --privileged -d h5project