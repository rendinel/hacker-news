import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  //06 we grab this value from useglobalcontext
  const { isLoading, page, nbPages, handlePage } = useGlobalContext()
  return (
    <div className='btn-container'>
      {/* //06 we return value dec when we clikc and disable the button while loading is true */}
      <button disabled={isLoading} onClick={() => handlePage('dec')}>
        prev
      </button>
      {/* we display the number of the page plus 1 so we start the count from 1 and we display the number of page */}
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage('inc')}>
        next
      </button>
    </div>
  )
}

export default Buttons
