import {cron} from 'https://deno.land/x/deno_cron/cron.ts';
import { getDolarDotayPrice } from './getDolarTodayInfo.ts';

cron('*/30 * * * * *', async () => {
    console.log('request apis...')
    // await getDolarDotayPrice()
    // await getAirTMPrice()
});