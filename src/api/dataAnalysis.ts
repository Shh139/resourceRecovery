import { http } from "@/utils/http";
import qs from "qs";

type returnFormat = {
  cound: string;
  data: object[];
  msg: string;
  status: number;
  suns: string;
};

type messSonList = {
  carbonReduction: number;
  collectCount: number;
  typeName: string;
  weight: number;
  weightRate: string;
};

export type messSon = {
  date: string;
  list: messSonList[];
};

export type monthlyCollection = {
  ound: string;
  data: { allWeight: number; allCount: number; list: object[] };
  msg: string;
  status: number;
  suns: string;
  css?: string;
};
type rightRateByDate = {
  date: string;
  joinCount: number;
  partyRate: number;
  rightRate: number;
  score: number;
  weight: number;
};
export type rightRateByDateType = {
  count: number;
  data: rightRateByDate[];
  msg: string;
  status: number;
  suns: string;
};
/** 首页->获取用户投递列表【Home -> Get user delivery list】 */
export const getRecList = () => {
  return http.request<returnFormat>("post", "/api/recBigData/getRecList");
};

/** 用户收集列表 【User collection list】 */
export const getWeeksData = () => {
  return http.request<returnFormat>("post", "/api/recBigData/getRecList");
};

/** 获取近7日内收集总量【The total amount collected on 7 days】 */
export const getLastWeekRecWeight = () => {
  return http.request<returnFormat>(
    "post",
    "/api/recBigData/getLastWeekRecWeight"
  );
};

/** 月内各类收集总量【Total amount of all types collected in a month】 */
export const getStatisticByDate = data => {
  var quer = qs.stringify(data);
  return http.request<monthlyCollection>(
    "post",
    "/api/recBigData/getStatisticByDate?" + quer
  );
};

/** 获取近日收集明细 【Recent collection details】 */
export const getLastWeekRecDetailByType = () => {
  return http.request<monthlyCollection>(
    "post",
    "/api/recBigData/getLastWeekRecDetailByType"
  );
};

/** 获取投放率趋势和正确率趋势 */
export const getRightRateByDateType = () => {
  return http.request<rightRateByDateType>(
    "post",
    "/api/getRightRateByDateType"
  );
};

// -----------------------------------------------
type dropTypeTendency = {
  date: string;
  joinCount: number;
  partyRate: number;
  rightRate: number;
  score: number;
  weight: number;
};

type dropTypeTendencyForm = {
  count: any;
  data: {
    allWeight: number;
    dtoList: dropTypeTendency[];
    rightRate: number;
  };
  msg: string;
  status: number;
  suns: any;
};

type recall = {
  address: string;
  cjTypeDesc: string;
  collectUserName: string;
  id: number;
  imgPath: string;
  point: number;
  putTime: string;
  rubbishTypeDesc: string;
  username: string;
  weight: number;
};

type recallOrder = {
  code: string;
  message: string;
  result: recall[];
};

type recall2 = {
  address: string;
  point: number;
  streetName: string;
  username: string;
  villageName: string;
};

type recallOrder2 = {
  code: string;
  message: string;
  result: recall2[];
};

type StatisticsMess = {
  errRate: number;
  joinCount: number;
  lastDate: any;
  otherRate: any;
  partyRate: number;
  perishRate: any;
  rightRate: number;
  userAllCount: number;
  userIfResCount: number;
  weight: number;
  yesterdayWeight: any;
};

export type StatisticsForm = {
  code: string;
  message: string;
  result: StatisticsMess;
};

/** 资源回收运营--获取总数据 */
export const getStatisOfEveryDay = data => {
  var quer = qs.stringify(data);
  return http.request<StatisticsForm>(
    "post",
    "/api/bigData/getStatisOfEveryDay?" + quer
  );
};

/** 获取正确率和参与率趋势图 */

export const getRightRateByDateType2 = data => {
  var quer = qs.stringify(data);
  return http.request<dropTypeTendencyForm>(
    "post",
    "/api/bigData/getRightRateByDateType?" + quer
  );
};

/** 获取投放列表 */
export const getRubbishList = data => {
  var quer = qs.stringify(data);
  return http.request<recallOrder>(
    "post",
    "/api/bigData/getRubbishList?" + quer
  );
};

/** 积分排名 */
export const getPointRankList = () => {
  return http.request<recallOrder2>("post", "/api/bigData/getPointRankList");
};
