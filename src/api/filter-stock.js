import {
	get,
	post,
	del
} from './http';

// 获取筛选股票的数量
export const getFilterStockCount = ( query ) => get(`/choose/count`, query);

// 选股
export const getFilterStocks = (query) => get(`/choose/`, query);

