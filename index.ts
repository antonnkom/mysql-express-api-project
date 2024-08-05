import { Express } from 'express';
import { Connection } from 'mysql2/promise';
import { initDataBase } from './src/services/db.js';
import { initServer } from './src/services/server.js';
import { commentsRouter } from './src/api/comments-api.js';
import { productsRouter } from './src/api/products-api.js';

export let server: Express;
export let connection: Connection;

const ROOT_PATH = '/api';

const initRouter = () => {
    server.use(`${ROOT_PATH}/comments`, commentsRouter);
    server.use(`${ROOT_PATH}/products`, productsRouter);
}

const launchApplication = async () => {
    server = initServer();
    connection = await initDataBase();

    initRouter();
};

launchApplication();