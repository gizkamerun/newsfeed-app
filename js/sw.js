importScripts('workbox-sw.js');

const staticAssets = [
    './',
    'css/bootstrap.min.css',
    'css/styles.css',
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'js/app.js'
     
];


const workboxSW = new WorkboxSW();
const networkFirst = workboxSW.strategies.networkFirst();

wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*)', wb.strategies.networkFirst());

