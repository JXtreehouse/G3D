
const path = require('path');
const dalaran = require('dalaran');
const tasks = dalaran.libraryTasks({
    umdName: 'G3D',
    demo: './demo',
    entry: './src/G3D.ts',
    port: 3000,
    loaders: [{
        test: /\.glsl$/,
        use: [
            'raw-loader',
            path.join(__dirname, './glsl-loader.js')
        ]
    }],
    devCors: true,
    testEntryPattern: 'test/**/*.spec.js',
    liveReload: true,
    typescript: true,
    htmlTemplate: path.join(__dirname, './template/html.handlebars'),
    jsTemplate: path.join(__dirname, './template/js.handlebars')
});

const taskName = process.argv[2];

switch (taskName) {

    case 'new':
        tasks.add();
        break;
    case 'test':
        tasks.test();
        break;
    case 'build':
        tasks.build();
        break;
    case 'dev':
    default:
        tasks.dev();
        break;
}

