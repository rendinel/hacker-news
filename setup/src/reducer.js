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
    //01 we set a default if our case doesen't match any action
    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer
