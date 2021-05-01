import {cron} from 'https://deno.land/x/deno_cron/cron.ts';
import { getAirtmPrice } from './getAirtmInfo.ts';
import { getDolarDotayPrice } from './getDolarTodayInfo.ts';
import { getMonitorPrice } from './getMonitorInfo.ts';
import { saveHistory } from '../utils/saveHistoryToDb.ts';

cron('* 40 * * * *', async () => {

    const { timeStamp, formatedDate } = getFormatedDate()
    
    const priceAirTm = await getAirtmPrice()
    const prices = await getDolarDotayPrice()
    const priceMonitor = await getMonitorPrice()

    let pricesToAdd: number[] = []

    if (priceMonitor) {
        pricesToAdd.push(priceMonitor)
        await saveHistory({ providermodelId: 1, amount: priceMonitor, dataStamp: timeStamp, dateString: formatedDate })
    } 

    if (prices) {
        pricesToAdd.push(prices.BCV)
        pricesToAdd.push(prices.dolarToday)
        await saveHistory({ providermodelId: 2, amount: prices.dolarToday, dataStamp: timeStamp, dateString: formatedDate })
        await saveHistory({ providermodelId: 3, amount: prices.BCV, dataStamp: timeStamp, dateString: formatedDate })
    }

    if (priceAirTm) {
        pricesToAdd.push(priceAirTm)
        await saveHistory({ providermodelId: 4, amount: priceAirTm, dataStamp: timeStamp, dateString: formatedDate })
    }
    const acumPrices = pricesToAdd.reduce( (acumulator, value) => acumulator + value )
    const promedio = acumPrices/pricesToAdd.length
    await saveHistory({ providermodelId: 5, amount: promedio, dataStamp: timeStamp, dateString: formatedDate })


});

const getFormatedDate = (): { formatedDate: string, timeStamp: number } => {

    const actualDate = new Date()
    const day = actualDate.getDate()
    console.log(actualDate, day)
    const month = actualDate.getMonth() + 1
    let hour = actualDate.getHours()
    const year = actualDate.getFullYear()

    let m = 'am'

    if (hour > 12 ) {
        hour = hour - 12
        m = 'pm'
    }



    const formatedDate = `${day}-${month}-${year}  ${hour}:00${m}`
    // const timeStamp = new Date(`${year}-${month}-${day} ${hour}:00`).getTime() / 1000
    const timeStamp = new Date().getTime()


    return {
        formatedDate,
        timeStamp
    }
}