import { 
  GET_SEARCH_STOCKS,
  SAVE_SEARCH_STOCK,
  CHANGE_FILTER_QUERY
} from '../constants/home'

import { getSearchStockInfo } from '../api/home'

export const saveSearchStockList = stockList => {
  return {
    type: SAVE_SEARCH_STOCK,
    stockList
  }
}

export const getSearchStockList = () => {
  return {
    type: GET_SEARCH_STOCKS
  }
}

export const changeFilterQuery = (filterQuery = {}) => {
  return {
    type: CHANGE_FILTER_QUERY,
    filterQuery
  }
}

// 异步的action
export function getSearchAsyncStockList(keyword) {
  return async dispatch => {
    if (!keyword) {
      dispatch(saveSearchStockList([]))
    } else {
      const { data } = await getSearchStockInfo(keyword)
      dispatch(saveSearchStockList(data.data || []))
    }
  }
}