import knex, { Knex } from 'knex'


export const dbContemp = knex({
  client: 'pg',
  connection: {
    host: '85.31.63.174',
    port: 5432,
    user: 'webadmin',
    password: 'AOKeha61664',
    database: 'contemp_hmg',
  },
}) as Knex