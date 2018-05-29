docker stop h5api

docker rm h5api

docker rmi h5api

docker build -t h5api .

docker run --name h5api -p 3005:3005 --privileged -d h5api
