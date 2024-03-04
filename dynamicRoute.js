const fs = require('fs');
const origin = require('./origin.json');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '85.31.63.174',
    port: 5432,
    user: 'webadmin',
    password: 'AOKeha61664',
    database: 'contemp_prod',
  },
});


const initCron = async () => {
    try {      
      // for await (const item of origin){
      //     console.log(item)
      //     await db('redirect_urls').insert({
      //         source: item.source,
      //         destination: item.destination
      //     })
      // }
      let list = await await db('redirect_urls')
      let createJson = list.map((item) => {
          return {
              source:item.source,
              destination:item.destination,
              permanent: true
            }
      })
  
      fs.writeFileSync('routes.json', JSON.stringify(createJson, null, 2));
	console.log('acabou')
      return true
    } catch (error) {
      return true
    }
};

initCron();
