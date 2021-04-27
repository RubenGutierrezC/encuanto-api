import { Router } from "https://deno.land/x/oak/mod.ts";
import { HistoryModel } from '../models/history.ts';
import { providers } from '../utils/defaultProviders.ts';
import { ProviderModel } from '../models/provider.ts';

const router = new Router();


// router.get('/prices', async ({ response }: { response: any }) => {
//   try {
//     const data = await HistoryModel.select('id').find("5")
//     response.body = data
//   } catch (error) {
//     console.log(error)
//     response.body = error
//   }
// })

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
