import * as express from 'express';
import * as graphqlHttp from 'express-graphql';
import schema from './graphql/schema';

class App {

    // Defino a variavel express como tipo express.Application
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    // Essa tipagem é do typescript.
    private middleware(): void {
        this.express.use('/graphql', graphqlHttp({
            schema: schema,
            graphiql: process.env.NODE_ENV === 'development'
        }));
    }

}

export default new App().express;