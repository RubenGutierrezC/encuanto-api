import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const url = 'https://monitordolarvenezuela.com/monitor-dolar-hoy';

export const getAirtmPrice = async () => {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const doc: any = new DOMParser().parseFromString(html, "text/html");        

        const precioDolar: string = doc.querySelector('tbody')?.children[2]?.children[5]?.textContent;
        const newPrice = precioDolar.replaceAll('.','').replace(',', '.')
        const parsedPrecio = parseFloat(newPrice)
        console.log('airtm', parsedPrecio)

        return parsedPrecio

    } catch (error) {
        console.log(error)
    }
}