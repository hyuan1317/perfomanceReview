import { createApiClient } from './apiClient';

export interface IUserInfo {
  tuser: string;
  team: string;
  contribution: string;
  commitment: string;
  potential: string;
  feedback: string;
  updateTime: string;
}

const apiClient = createApiClient();

export const getHistoryReview = async() => {
  const response = await apiClient.get<IUserInfo[]>('/getHistoryReview');
  return response.data;
}

export const getFakeHistoryReview = async () => {
  const historyReview: IUserInfo[] = require('../docs/historyReview.json');
  return historyReview;
}