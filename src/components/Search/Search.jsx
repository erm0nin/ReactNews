
import styles from './styles.module.css'
const Search = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.search}>
      <input placeholder='text' type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className={styles.input} />
    </div>
  )
}

export default Search
