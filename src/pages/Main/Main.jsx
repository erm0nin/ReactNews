import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import { getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/Pagination/Pagination'
const Main = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = 10
  const pageSize = 10

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true)
      const response = await getNews(currentPage, pageSize)
      setNews(response.news)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchNews(currentPage)
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePreviousPage = () => {
    console.log(currentPage)
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    console.log(currentPage)
  }
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (<NewsBanner item={news[0]} />) : (<Skeleton type={'banner'} count={1} />)}
      <Pagination
        handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPage} />
      {!isLoading ? (
        <NewsList news={news} />
      ) : (<Skeleton type={"item"} count={10} />)}
      <Pagination
        handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        totalPages={totalPage} />
    </main>
  )
}

export default Main
