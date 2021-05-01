interface Provider {
    id: number
    nombre: string
    logo: string
    color: string
}

export const returnProviderById = (id: number): Provider => {
    let obj: any = {}
    if ([1,2,3,4,5].includes(id)) {
        obj = providers.find(prov => prov.id === id)
    }
    return obj
}

export const providers: Provider[] = [
    {
        id: 1,
        nombre: "Monitor dolar",
        logo: 'url',
        color: '#FFFF00'
    },
    {
        id: 2,
        nombre: "Dolar Today",
        logo: 'url',
        color: '#0f8930'
    },
    {
        id: 3,
        nombre: "BCV",
        logo: 'url',
        color: '#000'
    },
    {
        id: 4,
        nombre: "Airtm",
        logo: 'url',
        color: '#1783fa'
    },
    {
        id: 5,
        nombre: "Encuanto promedio",
        logo: 'url',
        color: '#FF0000'
    }
]