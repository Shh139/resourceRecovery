import { http } from "@/utils/http";
import qs from "qs";

type site = {
  createTime: string;
  id: number;
  lastRegionName: string;
  level: number;
  regionName: string;
  updateTime: string;
};

type siteBack = {
  count: number;
  data: site[];
  msg: string;
  status: number;
  suns: any;
};

export const siteList = data => {
  var quer = qs.stringify(data);
  return http.request<siteBack>("post", "/api/region/list?" + quer, data, {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
};

export const editPwd = data => {
  var quer = qs.stringify(data);
  return http.request<siteBack>("post", "/api/suggest/editPwd?" + quer, data, {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
};
