import {cron} from 'https://deno.land/x/deno_cron/cron.ts';
import { getDolarDotayPrice } from './getDolarTodayInfo.ts';
import { getAirTMPrice } from './getAirTIMInfo.ts';

cron('*/30 * * * * *', async () => {
    console.log('request apis...')
    await getDolarDotayPrice()
    await getAirTMPrice()
});