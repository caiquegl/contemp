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