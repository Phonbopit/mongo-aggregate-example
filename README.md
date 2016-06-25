# mongo-aggregate-example
How to use aggregation in MongoDB

Link บทความ : [ทดลองเขียน Aggregation ใน MongoDB](http://devahoy.com/posts/mongodb-aggregation-example/)

## Datasheet

- [zipcodes collection](http://media.mongodb.org/zips.json)


## What is Aggregation Pipeline?

- A series of document transformations
- Executed in stages
- `$match` => `$project` => `$group` => `$sort`

## Operators

- `$match` : Filter documents
- `$project` : Reshape documents (Include, exclude, rename fields)
- `$group` : Summarize documents
- `$sort` : Ordering documents
- `$limit` : Paginate documents
- `$skip` : Same as `$limit`

## SQL to Aggregation Mapping

- `SELECT` = `$project`
- `WHERE` = `$match`
- `ORDER BY` = `$sort`
- `LIMIT` = `$limit`

Reference : [SQL to Aggretation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/)
