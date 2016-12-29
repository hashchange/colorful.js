({
    mainConfigFile: "../../../require-config.js",
    optimize: "none",
    name: "local.main",
    exclude: [
        "jquery",
        "underscore",
        "vue",
        "colorful"
    ],
    out: "../../output/parts/app.js"
})