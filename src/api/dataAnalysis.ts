import { http } from "@/utils/http";
import qs from "qs";

type returnFormat = {
  cound: string;
  data: object[];
  msg: string;
  status: number;
  suns: string;
};
type monthlyCollection = {
  ound: string;
  data: { allWeight: number; allCount: number; list: object[] };
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
