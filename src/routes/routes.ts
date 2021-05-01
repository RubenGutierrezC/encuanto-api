import { Router } from "https://deno.land/x/oak/mod.ts";
import { providers } from '../utils/defaultProviders.ts';
import { ProviderModel } from '../models/provider.ts';
import { HistoryModel } from '../models/history.ts';

const router = new Router();

interface HistoryDTO {
  providermodelId: string
  dateString: string
  amount: string
  dataStamp: string
  timeStamp: string
}

router.get('/history', async ({ response }: { response: any }) => {
  try {
    const data: any[] = await HistoryModel.select('*').groupBy('providermodelId').groupBy('id').orderBy('providermodelId').all();

    let responseArray = []

    let labels: string[] = [];
    let datasets: any[] = []

    if (data.length > 0) {

      let actualProviderId = 0
      const firstProvider = data[0].providermodelId

      for (const item of data) {
        console.log(item.providermodelId)
        console.log('compare: ', actualProviderId)
        if (item.providermodelId === firstProvider) {
          labels.push(item.dateString)
        }
  
        if (actualProviderId != item.providermodelId) {
          console.log('entro if')
          actualProviderId = item.providermodelId
          datasets.push({
            id: item.providermodelId,
            label: item.providermodelId,
            data: [item.amount],
            borderColor: 'rgba(1,1,1)',
            borderWidth: 1
          })
        } else {
          console.log('entro else')
          console.log(datasets[item.providermodelId]?.data)
          datasets[item.providermodelId - 1]?.data?.push(item.amount)
        }

          
      }
    }

    response.body = {
      labels,
      datasets
    }

  } catch (error) {
    console.log(error)
    response.body = error
  }
})

router.get('/providers', async ({ response }: { response: any }) => {
  try {
    const data = await ProviderModel.select('*').all();

    response.body = JSON.stringify(data)

  } catch (error) {
    console.log(error)
    response.body = error
  }
})

router.get('/initdb', async ({ response }: { response: any }) => {
  try {
    
    for (const provider of providers) {
      await ProviderModel.create({
        name: provider.nombre,
        logo: provider.logo
      })
    }

    response.body = 'created'

  } catch (error) {
    console.log(error)
    response.body = error
  }
})

export default router;
