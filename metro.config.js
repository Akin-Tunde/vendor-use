const { getDefaultConfig } = require("expo/metro-config");
// Change 'nativewind/metro-config' to 'nativewind/metro'
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });