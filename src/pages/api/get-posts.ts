import { NextApiRequest, NextApiResponse } from 'next';
import { dbBlog } from './database';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const [posts] = await dbBlog.raw(`
      SELECT
      post_title,
          (
            SELECT
                concat('https://blog.contemp.com.br/wp-content/uploads/', files.meta_value) 
              FROM
                wp_posts posts
                INNER JOIN wp_posts attachments ON posts.ID = attachments.post_parent
                INNER JOIN wp_postmeta files ON attachments.ID = files.post_id
              WHERE files.meta_key = '_wp_attached_file'
              AND posts.ID = wp_posts.ID
              ORDER BY files.post_id DESC
              LIMIT 1
          ) AS post_image,
          concat('https://blog.contemp.com.br/', wp_posts.post_name) AS post_url,
          wp_posts.post_content
      from wp_posts
      WHERE post_status  = 'publish' AND post_type = 'post'
      order by post_date
      DESC limit 3
    `)

    return res.json(posts)
  } catch (err) {
    console.error(err)
    return res.json({})
  }
}
