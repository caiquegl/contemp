import knex, { Knex } from 'knex'

export const db = knex({
  client: 'pg',
  connection: {
    host : '200.150.198.189',
    port : 5432,
    user : 'webadmin',
    password : 'XHNovy12859',
    database : 'production_rocketpdv'
  }
}) as Knex

export const dbBlog = knex({
  client: 'mysql',
  connection: {
    host : 'db.systagg.com.br',
    port : 3306,
    user : 'systagg',
    password : 'tagg!$$@',
    database : 'contemp_blog'
  }
}) as Knex