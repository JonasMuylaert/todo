cd app

echo 'Installing dependencies...'
apk add --no-cache make gcc g++ python
npm install 
echo 'uninstalling bcrypt'
npm uninstall bcrypt
echo 'installing bcrypt'
npm install bcrypt


echo 'done... starting API'

npm run start:dev