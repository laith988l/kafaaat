import { getBannerSettings } from './src/app/actions'; async function start() { const r = await getBannerSettings(); console.log(r); } start();
