import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

/*
  @Description:
    You can use this component whenever you want, you just need to grab the term and do your job. For a pratical,
    example see the implemetantion of this search in the HOME page.
*/
const Search = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('') // handling with user input

  //getting the search term from the user input, making the URL, and navigating to it.
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(pathname.concat('?query=', query))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Search example</h1>
        <input type="search" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Search