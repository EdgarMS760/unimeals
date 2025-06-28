module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',  
                        '@app': './app',
                        '@components': './components',
                        '@ui': './components/ui',
                        '@constants': './constants',
                        '@hooks': './hooks',
                        '@services': './services',
                        '@utils': './utils',
                        '@types': './types',
                        '@assets': './assets',
                    },
                },
            ],
        ],
    };
};
