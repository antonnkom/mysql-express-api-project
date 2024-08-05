import express, { Express } from 'express';

export const initServer = (): Express => {
    const app = express();

    const jsonMiddleWare = express.json();
    app.use(jsonMiddleWare);

    app.listen(3000, () => {
        console.log(`Server running on port 3000`);
    });

    return app;
};