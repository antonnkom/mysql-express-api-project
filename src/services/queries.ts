export const SELECT_COMMENT_BY_ID_QUERY = `
    SELECT * FROM comments WHERE comment_id = ?
`;

export const COMMENT_DUPLICATE_QUERY = `
    SELECT * FROM comments c
    WHERE LOWER(c.email) = ?
    AND LOWER(c.name) = ?
    AND LOWER(c.body) = ?
    AND c.product_id = ?
`;

export const INSERT_COMMENT_QUERY = `
    INSERT INTO comments
    (comment_id, email, name, body, product_id)
    VALUES
    (?, ?, ?, ?, ?)
`;

export const DELETE_COMMENT_QUERY = `
    DELETE FROM comments WHERE comment_id = ?
`;

export const INSERT_PRODUCT_QUERY = `
    INSERT INTO products
    (product_id, title, description, price)
    VALUES
    (?, ?, ?, ?)
`;