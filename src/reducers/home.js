import { 
  GET_SEARCH_STOCKS,
  SAVE_SEARCH_STOCK,
  CHANGE_FILTER_QUERY
} from '../constants/home'


const INITIAL_STATE = {
  searchStockList: null,
  filterQuery: null
}

export default function home (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_SEARCH_STOCK:
      return {
        ...state,
        searchStockList: action.stockList
      }
    case GET_SEARCH_STOCKS:
      return {
        ...state
      }
    case CHANGE_FILTER_QUERY:
      return {
        ...state,
        filterQuery: action.filterQuery
      }
    default:
      return state
  }
}