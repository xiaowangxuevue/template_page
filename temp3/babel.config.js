module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "52",
          "safari": "11.1",
          "android": "4.4.4"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
  ]
}

