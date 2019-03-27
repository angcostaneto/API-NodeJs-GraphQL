import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {genSaltSync, hashSync, compareSync, compare} from "bcryptjs";


// Exporta os campos do banco de dados.
export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

// A primeira forma serve para usar os metodos de instancia, exemplo save, delete e etc..
// E fala que aquela instancia tem os atributos do UserAttributes
// O segunda herança serve para acessar os atributos diretamentes pela instancia
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassoword(encodePassword: string, password: string): boolean;
}

// Essa interface permite fazer selects no banco de dados, fazer insert, update e associações da tabela
export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel = Sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'users',
        // Hooks são as triggers do banco de dados
        hooks: {
            beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            }
        }
    });

    User.prototype.isPassoword = (encodePassword: string, password: string): boolean => {
        return compareSync(password, encodePassword);
    };

    return User;
}