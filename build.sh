cd ngapp
ng build --output-path ../www
cd ..

cordova prepare ios
open platforms/ios/HelloCordova.xcworkspace/
