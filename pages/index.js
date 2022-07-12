import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Layout from '../components/Layout'
import utilStyles from "../styles/utils.module.css"
import { getPostsData } from '../lib/post'

//SSGの場合
// 外部から一度だけデータを取得
export async function getStaticProps() {
  const allPostsData = getPostsData()
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>私はフルスタックエンジニアです。Udemy講師として活動しています。好きな言語はJavaScriptです。</p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
