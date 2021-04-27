import { Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';

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
        log: DataTypes.STRING,
        data: DataTypes.STRING
    };
}