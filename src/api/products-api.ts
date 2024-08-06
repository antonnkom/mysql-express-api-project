import { Request, Response, Router } from "express";
import { IProductEntity, ICommentEntity, IProductSearchFilter, ProductCreatePayload } from '../../types';
import { connection } from '../../index.js';
import { mapProductsEntity, mapCommentsEntity } from '../services/mapping.js';
import { enhanceProductsComments, getProductsFilterQuery } from "../helper.js";
import { v4 as uuidv4 } from 'uuid';
import { OkPacket } from "mysql2";
import { INSERT_PRODUCT_QUERY } from '../services/queries.js';

export const productsRouter = Router();

const throwServerError = (res: Response, e: Error) => {
    console.debug(e.message);
    res.status(500);
    res.send('Something went wrong');
};

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const [productRows] = await connection.query <IProductEntity[]> (
            'SELECT * FROM products'
        );

        const [commentRows] = await connection.query < ICommentEntity[] > (
            'SELECT * FROM comments'
        );
    
        const products = mapProductsEntity(productRows);
        const result = enhanceProductsComments(products, commentRows);
    
        res.send(result);
        return;
    } catch (e) {
        throwServerError(res, e);
        return;
    }
});

productsRouter.get('/search', async (req: Request<{}, {}, {}, IProductSearchFilter>, res: Response) => {
    try {
        const [query, values] = getProductsFilterQuery(req.query);
        const [rows] = await connection.query <IProductEntity[]> (query, values);

        if (!rows?.length) {
            res.status(404);
            res.send(`Products are not found`);
            return;
        }

        const [commentRows] = await connection.query <ICommentEntity[]> (
            'SELECT * FROM comments'
        );

        const products = mapProductsEntity(rows);
        const result = enhanceProductsComments(products, commentRows);

        res.send(result);
        return;
    } catch (e) {
        throwServerError(res, e);
        return;
    }
});   

productsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [rows] = await connection.query <IProductEntity[]> (
            'SELECT * FROM products WHERE product_id = ?',
            [req.params.id]
        );

        if (!rows?.[0]) {
            res.status(404);
            res.send(`Product with id ${req.params.id} is not found`);
            return;
        }

        const [comments] = await connection.query <ICommentEntity[]> (
            'SELECT * FROM comments WHERE product_id = ?',
            [req.params.id]
        );

        const product = mapProductsEntity(rows)[0];

        if (comments.length) {
            product.comments = mapCommentsEntity(comments);
        }

        res.send(product);
        return;
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/', async (req: Request<{}, {}, ProductCreatePayload>, res: Response) => {
    try {
        const { title, description, price } = req.body;
        const id = uuidv4();
        await connection.query <OkPacket> (
            INSERT_PRODUCT_QUERY,
            [id, title || null, description || null, price || null]
        );

        res.status(201);
        res.send(`Product id:${id} has been added!`);
        return;
    } catch (e) {
        throwServerError(res, e);
        return;
    }
});

productsRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [info] = await connection.query <OkPacket> (
            'DELETE FROM products WHERE product_id = ?',
            [req.params.id]
        );

        if (info.affectedRows === 0) {
            res.status(404);
            res.send(`Product with id ${req.params.id} is not found`);
            return;
        }

        res.status(200);
        res.end();
        return;
    } catch (e) {
        throwServerError(res, e);
        return;
    }
});
