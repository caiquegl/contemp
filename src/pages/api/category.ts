import {db} from './database'

export default async function category (req: any, response: any) {
    try {
        const body = JSON.parse(req.body);
        for await (let [i,el] of body.entries()) {
          let obj = {
            description: el.description,
            description_seo: el.description_seo,
            key_word_seo: el.key_word_seo,
            name: el.name,
            favorite: el.favorite,
            is_active: el.is_active,
            is_main: el.is_main ? el.is_main == 'true' ? true : false : false,
            order_view: el.order,
            sub_categorie: el.sub_categorie ? el.sub_categorie : null,
            url: el.url ? el.url : null,
          }


          await db('categories').insert(obj)
          console.log(`${i} | ${body.length}`)
        }

        return response.json({ status: true });
    } catch (error: any) {
      console.log(error)
      return response.json({ status: false });
    }
  };