docker build -t angular-frontend -f Dockerfile.frontend .

docker run -d \
  -p 8081:443 \
  --name frontend \
  angular-frontend