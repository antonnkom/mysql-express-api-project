# Реализациия сервера на Express.js и MySQL

## Используемые технологии
1. Node.js
2. Express.js
2. TypeScript
3. JSON
4. MySQL

## Установка

```bash
npm install
```

## Запуск сервера
```bash
npm start
```

## Структура БД

**products**

--------------------------------------------------------
product_id  | title       | description | price        |
------------|-------------|-------------|--------------|
varchar(36) | varchar(255)| varchar(255)| decimal(10,2)|
NOT NULL    | NOT NULL    |             | NOT NULL     |
primary key |             |             |              |
--------------------------------------------------------

**images**

------------------------------------------------
image_id   | url      | product_id | main      |
-----------|----------|------------|-----------|
varchar(36)| text     | varchar(36)| tinyint(1)|
NOT NULL   | NOT NULL | NOT NULL   | NOT NULL  |
primary key|          | fk         |           |
------------------------------------------------

**comments**

---------------------------------------------------------------------
comment_id  | name        | email        |body         | product_id |
------------|-------------|--------------|-------------|------------|
varchar(36) | varchar(255)| varchar(255) | varchar(255)| varchar(36)|
NOT NULL    | NOT NULL    | NOT NULL     | NOT NULL    | NOT NULL   |
primary key |             |              |             | FK         |
---------------------------------------------------------------------

## Тестирование запросов

Для тестирования запросов использовалась программа [Postman](https://www.postman.com/downloads/)

### comment-api

1. ***GET http://localhost:3000/api/comments*** - получение списка всех комментариев
2. ***GET http://localhost:3000/api/comments/id*** - получение комментария с заданым *id*
3. ***POST http://localhost:3000/api/comments*** - добавление нового комментария

Пример тела POST запроса:

```json
{
    "name": "Another one comment with uniq id",
    "body": "This is first comment we added by the POST-request",
    "postId": 12345,
    "email": "12345@gmail.com"
}
```

4. ***PATCH http://localhost:3000/api/comments*** - обновление существующего комментария (либо создание нового, если комментарий не существует)

Пример тела PATCH запроса:

```json
{
    "id": 9999,
    "name": "Comment update",
    "body": "Somebody la-la-la",
}
```

*Если комментарий не существует, то в теле PATCH-запроса должны присутствовать все обязательные поля. Запрос выше в этом случае вернёт ошибку с кодом **400***.

5. ***DELETE http://localhost:3000/api/comments/id*** - удаление комментария

### product-api

1. ***GET http://localhost:3000/api/products*** - получение списка всех товаров
2. ***GET http://localhost:3000/api/products/search?title=Pixel&description=&priceFrom=30000&priceTo=59000*** - поиск по товарам, где 
*title* - имя (часть имени)
*description* - описание (часть описания)
*priceFrom* - значение цены от
*priceTo* - значение цены до

3. ***GET http://localhost:3000/api/products/id*** - поиск товара по id
4. ***POST http://localhost:3000/api/products*** - добавление довара

Пример тела запроса POST:

```json
{
    "title": "Samsumg A50",
    "price": 12000.50
}
```

5. ***DELETE http://localhost:3000/api/products/id*** - удаление товара

Пример тела запроса DELETE:

``` json
{
    "product_id": "4f4b4f16-77cb-4c24-bcae-238cde406fb3"
}
```

6. ***POST http://localhost:3000/api/products/add-images*** - добавление изображений определённому товару

Пример тела запроса POST:

```json
{
    "productId": "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
    "images": [
        {
            "url": "https://unsplash.com/photos/leqrylJNYUQ",
            "main": true
        },
        {
            "url": "https://unsplash.com/photos/leqrylJNYUQ",
            "main": false
        }
    ]
}
```

7. ***DELETE http://localhost:3000/api/products/remove-images*** - удаление изображений

Пример тела запроса DELETE:

```json
[
    "7aa70618-e04a-4600-8092-98499cd4fa50",
    "481d5553-f773-4db9-b6fa-82a9e680801b"
]
```
