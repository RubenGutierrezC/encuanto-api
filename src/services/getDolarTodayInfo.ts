const APIURl = 'https://s3.amazonaws.com/dolartoday/data.json'

interface dolarTodayApi {
    USD: {
        promedio: number
        promedio_real: number
    }
}

export const getDolarDotayPrice = async () => {
    try {
        const request = await fetch(APIURl)
        const response: dolarTodayApi = await request.json()
        console.log('precio dolar today', response.USD.promedio)
        console.log('precio BCV', response.USD.promedio_real)
    } catch (error) {
        console.log(error)
    }
}

