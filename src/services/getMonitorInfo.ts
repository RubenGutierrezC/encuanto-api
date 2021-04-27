import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const url = "https://www.btcprecio.com/";

export const getMonitorPrice = async () => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const doc: any = new DOMParser().parseFromString(html, "text/html");

    const precioDolar: string = doc.querySelector('.centro').textContent
    const onlyNumber = precioDolar.split(" Bs.")[0]
    const parsedAmount = parseFloat(onlyNumber.replaceAll(" ", ""))

    console.log(parsedAmount)

  } catch (error) {
    console.log(error);
  }
};
