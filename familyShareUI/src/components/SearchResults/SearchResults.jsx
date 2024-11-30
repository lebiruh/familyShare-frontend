import { useNavigate } from "react-router-dom"
import "./searchResults.css"

const SearchResults = ({query, results, isLoading, setQuery}) => {

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/profile/${id}`)
    setQuery('')
  }

  return (
    <div className={query ? 'search_results_container' : 'no-query'}>
      <div className="search_results">
        {
          isLoading ? <p>Loading...</p> : (
            results.length !== 0 ? <ul>{results.map((user) => <li key={user.id} className="user_list" onClick={() => handleClick(user.id)}><span>{user.firstName} </span><span>{user.lastName}</span></li>)}</ul> : <p>No users found</p>
          )
        }
      </div>
    </div>   
  )
}

export default SearchResults