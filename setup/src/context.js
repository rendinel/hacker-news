import React, { useContext, useEffect, useReducer } from 'react'
//{1} instead of writing the action for the reducer we set them as variable in a separate and import them,this way if we write a name wrong it'e easier to track the error of an undefined var
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //01 we need to pass 2 thing a reducer function that will be set up our state(all of the change will happein inside the reducer.js) and our initial state
  const [state, dispatch] = useReducer(reducer, initialState)

  //01 we use the dispatch to change the state like the set function in the usestate
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    //02 we fetch the data from our url(here as a parameter we define the url inside the useeffect)
    //then we use the dispatch to modify our hits and nbpages with the data from our url,we need to define the action inside the reducer.js
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 04 we setup the removestory function with a dispatch where we set type and id as a payload
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }

  //01 we call fetch stories the fitst time we render the page
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [])
  return (
    <AppContext.Provider value={{ ...state, removeStory }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
