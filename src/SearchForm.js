import { queryAllByAltText } from '@testing-library/react'
import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  // 05 we grab query and handlesearch from context
  const { query, handleSearch } = useGlobalContext()
  return (
    // 05 onchange we grab the value from the input and pass to our function handlesearch and onsubmit we prevent the default behaviour
    <form
      className='search-form'
      onChange={(e) => handleSearch(e.target.value)}
      onSubmit={(e) => e.preventDefault()}
    >
      <h2>search hacker news</h2>
      <input type='text' className='form-input' value={query} />
    </form>
  )
}

export default SearchForm
