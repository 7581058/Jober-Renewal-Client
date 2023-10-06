import { Drawer } from '@/components/SharePage/Drawer'
import { Profile } from '@/components/SharePage/Profile'
import { BlocksViewer } from '@/components/SharePage/SharePageBlocksViewer'
import { SEO, SPACE } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { type SharePage } from '@/models/space'
import { useSharePageStore } from '@/store/sharePage'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styles from './SharePage.module.scss'

interface PageSource {
  title: string
  description: string
  profileImageLink: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: SharePage = useServerSideProps(SPACE)
  const { sharePage, loadSharePageFromBack, setSharePage, isLoaded, isFetching, setSharePageMode } = useSharePageStore()
  const { pageId } = useParams<Record<string, string>>()

  useEffect(() => {
    // CASE : CSR
    // react 내부적으로 주소를 이동할 경우 space를 다시 로드합니다.
    // SSR시 데이터가 없을 경우도 여기에서 처리합니다.
    if (!SSRSpace?.pageId) {
      loadSharePageFromBack(pageId ?? '')

      return
    }

    // CASE : CSR
    // SSR로 로드한 spaceId와 이동할 space가 다르다면 space를 다시 로드합니다.
    if (SSRSpace?.pageId !== pageId) {
      loadSharePageFromBack(pageId ?? '')

      return
    }

    // CASE : SSR
    // HACK : 권한은 임시로 업데이트하는 척 합니다.
    const nextSpace: SharePage = {
      ...SSRSpace
    }
    if (nextSpace.privilege === 'EDIT') setSharePageMode('edit')
    setSharePage(nextSpace)
  }, [pageId])

  useEffect(() => {
    // CASE : CSR
    // HACK : fetch가 완료되면 페이지 권한을 체크 후 업데트합니다.
    if (!isFetching) {
      const nextSpace: SharePage = {
        ...sharePage
      }
      if (nextSpace.privilege === 'EDIT') setSharePageMode('edit')
      setSharePage(nextSpace)
    }
  }, [isFetching])

  return (
    <>
      <Helmet>
        <title>{pageSource.title ? `Jober chip | ${pageSource.title}` : 'Jober'}</title>
        <meta name="description" content={pageSource.description ?? ''} />
        <link rel="favicon" href={pageSource.profileImageLink ?? '/favicon.ico'} />
      </Helmet>
      {isLoaded && <Profile />}
      <aside>{<Drawer />}</aside>
      <div className={styles.viewer}>
        <div className={styles.spaceViewer}>
          <section>{sharePage?.pageId === pageId && isLoaded && <BlocksViewer />}</section>
        </div>
      </div>
    </>
  )
}
