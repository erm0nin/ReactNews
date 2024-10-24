import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import { getCategories, getNews } from '../../api/apiNews'
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/Pagination/Pagination'
import Categories from '../../components/Categories/Categories'
import Search from '../../components/Search/Search'
import useDebounce from '../../helpers/hooks/useDebounce'
const Main = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [keywords, setKeywords] = useState('')
  const totalPage = 10
  const pageSize = 10
  const debauncedKeywords = useDebounce(keywords, 1500)

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true)
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: debauncedKeywords,
      })
      setNews(response.news)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(["All",...response.categories])

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchNews(currentPage)
  }, [currentPage, selectedCategory, debauncedKeywords])

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
      <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Search keywords={keywords} setKeywords={setKeywords}/>
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
