운영자: operator@sharehouse.kr / 1234
정산담당: finance@sharehouse.kr / 1234
시설담당: facility@sharehouse.kr / 1234
청소 담당: cleaning@sharehouse.kr / 1234
민원 담당: call@sharehouse.kr / 1234
초기 세팅 담당: setup@sharehouse.kr / 1234
입주자: resident@sharehouse.kr / 1234


cd /home/smarton/sharehouse
npm ci        # package-lock.json 있으면 권장
# (lock 없으면 npm install)
npm run build
npm run start -- -p 3000

docker run -d \
  --name sharehouse-test \
  -p 38001:3000 \
  -v /home/smarton/sharehouse:/app \
  -w /app \
  node:22-alpine \
  sh -c "npm ci && npm run build && npm run start -- -p 3000"

docker run -d \
  --name sharehouse-test \
  -p 38001:3000 \
  -v /home/smarton/sharehouse:/app \
  -w /app \
  node:22-alpine \
  sh -c "npm ci && npm run build && npm run start -- -p 3000"



docker run -d \
  --name sharehouse-test \
  -p 38001:3000 \
  -v /home/smarton/sharehouse:/app \
  -w /app \
  node:22-alpine \
  sh -c "npm install && npm run build && npm run start -- -p 3000"


