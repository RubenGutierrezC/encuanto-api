import { Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';
import { HistoryModel } from './history.ts';

export class ProviderModel extends Model {

    static table = 'providers';
    static timestamps = true;

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        logo: DataTypes.STRING
    };

    static histories() {
        return this.hasMany(HistoryModel);
    }
}