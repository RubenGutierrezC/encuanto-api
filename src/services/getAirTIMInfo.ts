const APIURl = 'https://rates.airtm.io/air-rates-csv?lang=es'

// interface dolarTodayApi {
//     USD: {
//         promedio: number
//         promedio_real: number
//     }
// }

export const getAirTMPrice = async () => {
    try {
        console.log('airtim...')
        const request = await fetch(APIURl)
        console.log(request)
        const response = await request.json()
        console.log('precio airim', response)
        // console.log('precio BCV', response.USD.promedio_real)
    } catch (error) {
        console.log(error)
    }
}

