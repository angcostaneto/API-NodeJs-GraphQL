import * as Sequelize from "sequelize";

export interface DbConnection {

    sequelize: Sequelize.Sequelize;
}