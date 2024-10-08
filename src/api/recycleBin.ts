import { http } from "@/utils/http";
import qs from "qs";

type recycleBin = {
  addUser: string;
  areaId: number;
  areaInfo: string;
  cityId: number;
  createTime: string;
  estateId: number;
  id: number;
  lat: string;
  lng: string;
  provinceId: number;
  siteDesc: string;
  siteName: string;
  siteType: number;
  streetId: number;
  updateTime: string;
  villageId: number;
};
type recycleBinList = {
  count: number;
  data: recycleBin[];
  msg: string;
  status: number;
  suns: string;
};

export const getRubbishSiteList = data => {
  var quer = qs.stringify(data);
  return http.request<recycleBinList>(
    "post",
    "/api/rubbishSite/getRubbishSiteList?" + quer
  );
};

/** 添加站点信息 */
export const addRubbishSite = data => {
  var quer = qs.stringify(data);
  return http.request<recycleBinList>(
    "post",
    "/api/rubbishSite/addRubbishSite?" + quer
  );
};

/** 删除相关站点 */
export const delRubbishSite = data => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/rubbishSite/delRubbishSite?" + quer);
};

/** 编辑站点信息 */
export const updateRubbishSite = data => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/rubbishSite/updateRubbishSite?" + quer);
};
