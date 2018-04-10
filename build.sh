cd www.src
cd poc
ng build --output-path ../../www
cd ..
cd ..
cordova prepare ios
open platforms/ios/HelloCordova.xcworkspace/
