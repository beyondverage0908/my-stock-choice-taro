import { get, post } from './http';

// 获取个股票信息
export const sysVisit = (stockCode) => {
	return post(`/sys/visit/${stockCode}`);
}

// 登录
export const login = (code) => {
	return post(`/sys/login?code=${code}`);
}