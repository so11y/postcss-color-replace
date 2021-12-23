const postcss = require('postcss')

const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red += Math.round(tint * (255 - red))
    green += Math.round(tint * (255 - green))
    blue += Math.round(tint * (255 - blue))

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
}
function getThemeCluster(theme) {
    const clusters = [theme]
    for (let i = 1; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    return clusters
}
function updateStyle(style, oldCluster, newCluster) {
    let newStyle = style
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
}
function flat(arr) {
    return Array.prototype.concat.apply([], arr)
}

module.exports = postcss.plugin('postcss-color-replace', (opts = {}) => {
    if (!opts.newColor && !opts.ordColor) {
        return () => { }
    }
    const themeCluster = flat(
        opts.newColor.map((v) => {
            return getThemeCluster(v.replace('#', ''))
        })
    )

    const originalCluster = flat(
        opts.ordColor.map((v) => {
            return getThemeCluster(v.replace('#', ''))
        })
    )

    return (root) => {
        root.walkDecls((decl) => {
            if (originalCluster.some(v => new RegExp(v, 'i').test(decl.value))) {
                decl.value = updateStyle(decl.value, originalCluster, themeCluster)
            }
        })
    }
})
