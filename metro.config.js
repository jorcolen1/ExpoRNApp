//const { getDefaultConfig } = require('expo/metro-config'); module.exports = (async () => { const { resolver: { sourceExts, assetExts }, } = await getDefaultConfig(__dirname); return { resolver: { assetExts: [ assetExts, 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'otf', 'woff', 'woff2', ], sourceExts: [ ...sourceExts, 'cjs', 'jsx', 'ts', 'tsx', 'mjs', 'md', 'mdx', ], }, }; })();
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;