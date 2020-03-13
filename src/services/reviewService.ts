import { createApiClient } from './apiClient';

export interface IUserInfo {
  tuser: string;
  team: string;
  contribution: string;
  commitment: string;
  potential: string;
  feedback: string;
  updateTime?: string;
}
export interface IUserList {
  [team: string]: string[];
}

const apiClient = createApiClient();

/*----------- fake api ------------*/
const getFakeHistoryReview = async () => {
  const historyReview: IUserInfo[] = require('../docs/historyReview.json');
  return historyReview;
}
const getFakeUserList = async () => {
  const userList: IUserList = require('../docs/userList.json');
  return userList;
}
/*---------------------------------*/

const getHistoryReview = async() => {
  const response = await apiClient.get<IUserInfo[]>('/getHistoryReview');
  return response.data;
}
const updateUserReview = async(userInfo: IUserInfo) => {
  const response = await apiClient.post('/updateReview', userInfo);
  return response.data;
}
const deleteUserReview = async(userName: string) => {
  const response = await apiClient.delete(`/deleteReview/${userName}`); // to be modified
  return response.data;
}
const addUserReview = async(userInfo: IUserInfo) => {
  const response = await apiClient.post('/addReview', userInfo);
  return response.data;
}
const getUserList = async() => {
  const response = await apiClient.get<IUserList>('/getUserList');
  return response.data;
}

export default {
  getHistoryReview,
  getFakeHistoryReview,
  updateUserReview,
  deleteUserReview,
  addUserReview,
  getUserList,
  getFakeUserList,
};
