import { Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';
import { ProviderModel } from './provider.ts';

export class HistoryModel extends Model {

    static table = 'history';
    static timestamps = true;

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        amount: DataTypes.FLOAT,
        dateString: {
            type: DataTypes.STRING,
            unique: true
        },
        dataStamp: {
            type: DataTypes.FLOAT,
            unique: true
        }
    };

    static provider() {
        return this.hasOne(ProviderModel);
    }

}
