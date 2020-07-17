module.exports = {
    // parser: 'sugarss',
    parser: 'postcss-scss',
    plugins: {
        autoprefixer: {},
        // 'postcss-import': {
        //     resolve(id) {
        //         if (id.charAt(0) === '~') {
        //             return id.substr(1)
        //         }
        //         return id
        //     },
        // },
        // 'postcss-preset-env': {},
        // cssnano: {},
    },
}