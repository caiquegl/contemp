import { collection, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { database } from '../../utils/db';


const getCategory = async () => {
  try {
    const dbInstanceCategory = collection(database, 'categories')

    let OLDlist: any = []
    await getDocs(dbInstanceCategory).then(async (data) => {
      data.docs.map((el: any, index: number) => {
        OLDlist.push({
          ...el.data(),
          id: data.docs[index].id,
          ref: data.docs[index].ref
        })
      })
    })

    let active = OLDlist.filter((el: any) => el.is_active == true && el.id != 'ZGRgyNWLIzLRqjwqcdPF')

    return OLDlist
  } catch (error) {
    console.log(error)
  }
}

const getAllProducts = async () => {
  try {
    const dbInstanceProduct = collection(database, 'products')

    let listOld: any = []
    await getDocs(dbInstanceProduct).then(async (data) => {
      data.docs.map((el: any, index: number) => {
        listOld.push({
          ...el.data(),
          id: data.docs[index].id,
          ref: data.docs[index].ref
        })
      })
    })

    let list = listOld.filter((el: any) => el.category != 'ZGRgyNWLIzLRqjwqcdPF')

    return listOld
  } catch (error) {
    console.log(error)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let data = [
      { loc: "https://contemp.com.br/" },
      { loc: "https://contemp.com.br/a-contemp" },
      { loc: "https://contemp.com.br/calibracao" },
      { loc: "https://blog.contemp.com.br/politica-de-privacidade" },
      { loc: "https://contemp.com.br/suporte-tecnico" },
      { loc: "https://contemp.com.br/todosProdutos" },
      { loc: "https://contemp.com.br/trabalhe-conosco" },
      ...(await getCategory()).map((category:any) => ({loc: "https://contemp.com.br/category/"+ category.name.toLowerCase().replaceAll(' ', '_') })),
      ...(await getAllProducts()).map((product:any) => ({loc: "https://contemp.com.br/produto/"+ product.name.toLowerCase().replaceAll(' ', '_') }))

  ]

  return res.json(data)
}