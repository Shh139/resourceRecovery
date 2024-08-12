import { http } from "@/utils/http";
import qs from "qs";

/** 积分明细汇总查询 */
export const pointCount = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/pointDetail/pointCount?" + quer);
};

/** 用户积分查询 */
export const pointUserList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/pointUser/pointUserList?" + quer);
};

/** 用户积分查询 */
export const pointDetailList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/pointDetail/pointDetailList?" + quer);
};

/** 签到积分管理列表 */
export const signPoint = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/signPoint/list?" + quer);
};

/** 订单处理 */
export const updatePointStatus = data => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/pointDetail/updatePointStatus?" + quer);
};
