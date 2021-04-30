import {cron} from 'https://deno.land/x/deno_cron/cron.ts';
import { getAirtmPrice } from './getAirtmInfo.ts';
import { getDolarDotayPrice } from './getDolarTodayInfo.ts';
import { getMonitorPrice } from './getMonitorInfo.ts';
import { saveHistory } from '../utils/saveHistoryToDb.ts';

cron('*/30 * * * * *', async () => {

    const { timeStamp, formatedDate } = getFormatedDate()
    
    const priceAirTm = await getAirtmPrice()
    const prices = await getDolarDotayPrice()
    const priceMonitor = await getMonitorPrice()

    let pricesToAdd: number[] = []

    if (priceAirTm) pricesToAdd.push(priceAirTm)
    if (priceMonitor) {
        pricesToAdd.push(priceMonitor)
        await saveHistory({ providermodelId: 1, amount: priceMonitor, dataStamp: timeStamp, dateString: formatedDate })
    } 
    if (prices) {
        pricesToAdd.push(prices.BCV)
        pricesToAdd.push(prices.dolarToday)
    }

    const acumPrices = pricesToAdd.reduce( (acumulator, value) => acumulator + value )
    const promedio = acumPrices/pricesToAdd.length
    console.log(promedio)

    
});

const getFormatedDate = (): { formatedDate: string, timeStamp: number } => {

    const actualDate = new Date()
    const day = actualDate.getDate()
    const month = actualDate.getMonth() + 1
    let hour = actualDate.getHours()
    const year = actualDate.getFullYear()

    let m = 'am'

    if (hour > 12 ) {
        hour = hour - 12
        m = 'pm'
    }

    const formatedDate = `${day}-${month}-${year}  ${hour}:00${m}`
    const timeStamp = new Date(`${year}-${month}-${day} ${hour}:00`).getTime() / 1000

    return {
        formatedDate,
        timeStamp
    }
}