import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
//01 we define a switch to act based on our action type
const reducer = (state, action) => {
  switch (action.type) {
    //01 with setloading we return our state and we modify isLoading to true
    case SET_LOADING:
      return { ...state, isLoading: true }
    //02 with sethstories we return our state,we setisloading to false because we don't want to display the circle loading,we modify hits and nbpages with the data from our payload
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }
    //04 inside the removestory case we return our state and then we change hits to a new array where we remove the item withn an id that doesen't match our action payload
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      }
    // 05 we return our state,we set our query to be equal to our action.payload(the value we grab from our input) and we set the page at 0 so it will display the first page
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      }
    //06 add/subtract one to our page but we need to check if we are at the end or at the start, nbpages is st at 50 but because js count from 0 to 49 our last page will be nbpages-1 and the same logic apply when prevpage is lkess than 0
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === 'dec') {
        let prevPage = state.page - 1
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage }
      }
    //01 we set a default if our case doesen't match any action
    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer
