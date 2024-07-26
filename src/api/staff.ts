import { http } from "@/utils/http";
import qs from "qs";

/** 获取收集员列表 */
export const staffList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/collectionUser/collectionUserList?" + quer);
};

/** 获取收集员考勤列表 */
export const checkList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request(
    "post",
    "/api/collectionUserCheck/collectionUserCheckList?" + quer
  );
};

/** 获取数据报表数据 */
export const reportList = (data: object) => {
  var query = qs.stringify(data);
  return http.request(
    "post",
    "/api/collectUserReport/collectUserReportList?" + query
  );
};

/** 获取收集列表数据总计 */
export const listSun = (data: object) => {
  var query = qs.stringify(data);
  return http.request("post", "/api/VehicleCollectionList/listSun?" + query);
};

// 获取收集列表
export function collectionList(data) {
  var query = qs.stringify(data);
  return http.request("post", "/api/VehicleCollectionList/list?" + query);
}
/** 获取收集员详细信息 */
export const editCollectionUser = (data: object) => {
  var query = qs.stringify(data);
  return http.request(
    "post",
    "/api/collectionUser/editCollectionUsers?" + query
  );
};

/** 编辑收集员信息 */
export const updateCollectionUser = (data: object) => {
  var query = qs.stringify(data);
  return http.request(
    "post",
    "/api/collectionUser/updateCollectionUser?" + query
  );
};

/** 删除采集员信息 */
export const deleteCollectionUser = (data: object) => {
  var query = qs.stringify(data);
  return http.request(
    "post",
    "/api/collectionUser/deleteCollectionUser?" + query
  );
};

/** 添加收集员 */
export const addCollectionUser = (data: object) => {
  var query = qs.stringify(data);
  return http.request("post", "/api/collectionUser/addCollectionUser?" + query);
};

/** 导出相关收集列表中的数据 */
export const exportCollectData = query => {
  var qy = qs.stringify(query);
  return http.request("get", "/api/collectionUser/addCollectionUser?" + qy);
};