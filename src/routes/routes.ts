import { Router } from "https://deno.land/x/oak/mod.ts";
import client from "../db.ts";

const router = new Router();


router.get('/prices', async ({ response }: { response: any }) => {
  try {
    const data = await client.queryObject("select * from proveedor")
    response.body = data.rows
  } catch (error) {
    response.body = error
  }
})

export default router;
