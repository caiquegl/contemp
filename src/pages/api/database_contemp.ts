import knex, { Knex } from 'knex'


export const dbContemp = knex({
  client: 'pg',
  connection: {
    host: '191.243.198.53',
    port: 5432,
    user: 'webadmin',
    password: 'AOKeha61664',
    database: 'site_production',
  },
}) as Knex