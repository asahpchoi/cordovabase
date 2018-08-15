cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-datepicker.DatePicker",
    "file": "plugins/cordova-plugin-datepicker/www/ios/DatePicker.js",
    "pluginId": "cordova-plugin-datepicker",
    "clobbers": [
      "datePicker"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/ios/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-datepicker": "0.9.3",
  "cordova-plugin-ionic-keyboard": "2.1.2"
};
// BOTTOM OF METADATA
});