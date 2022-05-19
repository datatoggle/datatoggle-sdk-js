echo "set npm packages version to $1"
cd ./sdk
npm version "$1"
cd ../destinations
for dest in ./*
do
  cd ${dest}
  npm version "$1"
  cd ..
done
