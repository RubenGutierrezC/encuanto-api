import { HistoryModel } from '../models/history.ts';

interface Prop {
    providermodelId: number,
    amount: number,
    dateString: string
    dataStamp: number
}


export const saveHistory = async  (props: Prop) => {
    try {
        console.log({...props})

        const data = await HistoryModel.create({...props})

        console.log(data)
    } catch (error) {
        throw error
    }
}