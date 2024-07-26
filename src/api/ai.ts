import { http } from "@/utils/http";
import qs from "qs";

/** 人脸识别列表 */
export const userFaceList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/ai/userFaceList?" + quer);
};

export const imgAiReportList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/ai/imgAiReportList?" + quer);
};

export const detectDiscardList = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/detect/detectDiscardList?" + quer);
};

/** 删除人脸识别数据 */
export const deleteUserFace = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/ai/deleteUserFace?" + quer);
};
