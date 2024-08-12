import { http } from "@/utils/http";
import axios from "axios";
import qs from "qs";

type huiPrdYCList = {
  address: string;
  createTime: string;
  fullname: string;
  iconImg: string;
  id: number;
  price: number;
  tel: string;
  title: string;
  units: string;
};

type callbackFormat = {
  count: number;
  data: huiPrdYCList[];
  msg: string;
  status: number;
  suns: string;
};
type orderList = {
  money: number;
  rubbishName: string;
  weight: number;
};
type orderMess = {
  allMoney: number;
  allPoint: number;
  allWeight: number;
  rubbishNameTotalDtos: orderList[];
};

type OrderFormat = {
  count: number;
  data: orderMess;
  msg: string;
  status: number;
  suns: string;
};

/** 获取回收类型 */
export const getHuiPrdYCList = data => {
  var quer = qs.stringify(data);
  return http.request<callbackFormat>(
    "post",
    "/api/huiPrd/getHuiPrdYCList?" + quer
  );
};

/** 图片上传 */
export const updateImage = quer => {
  return axios.post("/api/adminUtils/upload", quer, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  });
};

/** 根据手机号搜索相应采集员 */
export const collectionUserYCList = query => {
  return http.post("/api/collectionUser/collectionUserYCList", query);
};

/** 添加回收类型 */
export const addHuiPrd2 = data => {
  var quer = qs.stringify(data);
  return http.post("/api/huiPrd/addHuiPrd2?" + quer);
};

/** 删除回收类型 */
export const delHuiPrdYC = data => {
  var quer = qs.stringify(data);
  return http.post("/api/huiPrd/delHuiPrdYC?" + quer);
};

/** 修改回收类型 */
export const updateHuiPrdYC = data => {
  var quer = qs.stringify(data);
  return http.post("/api/huiPrd/updateHuiPrdYC?" + quer);
};

/** 获取回收订单 */
export const getPoisonousOrderDail = data => {
  var quer = qs.stringify(data);
  return http.post("/api/joiningtrader/getPoisonousOrderDail?" + quer);
};

/** 获取回收订单数据 */
export const selectTotalWeight = data => {
  var quer = qs.stringify(data);
  return http.request<OrderFormat>(
    "post",
    "/api/joiningtrader/selectTotalWeight?" + quer
  );
};
