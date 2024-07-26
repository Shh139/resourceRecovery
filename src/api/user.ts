import { http } from "@/utils/http";
import qs from "qs";

export type UserResult = {
  success?: boolean;
  status?: Number;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  // return http.request<UserResult>("post", "/login", { data });
  var quer = qs.stringify(data);
  return http.request<UserResult>("post", "/api/login2?" + quer, { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

/** 获取用户信息 */
export const getUserMess = () => {
  return http.request("post", "/api/adminUtils/getLoginUser");
};

/** 获取用户默认地址 */
export const getSite = () => {
  return http.request("post", "/api/residentInfo/residentInfoPageGet");
};

/** 获取验证码 */
export const getCode = (data?: object) => {
  return http.request(
    "get",
    "/api/getCHKCode",
    { data },
    { responseType: "blob" }
  );
};

/** 获取用户列表 */
export const getUserListMess = (data?: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/residentInfo/getUserList?" + quer);
};

/** 添加用户 */
export const addUserInfo = (data?: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/residentInfo/addResidentInfo?" + quer);
};

/** 获取相应地区下的列表 */

export const getcity = (data: number) => {
  return http.request("post", "/api/region/getNextRegionList?regionId=" + data);
};

/** 删除用户 */
export const deleteUser = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/residentInfo/delUserList?" + quer);
};

/** 用户信息编辑 */
export const updateUserInfo = (data: object) => {
  return http.request("post", "/api/residentInfo/updateResidentInfo?" + data);
};

/** 上传模板 */
// 上传模板
export function excelImportTemplate(data) {
  var quer = qs.stringify(data);
  return http.request("post", "/api/memberManage/excelImportTemplate?" + quer);
}

/** 下载模板 */
export const downExcelTemplate = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/memberManage/downExcelTemplate?" + quer);
};

/** 上传文件 */
export const importUserFace = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/memberManage/downExcelTemplate?" + quer);
};

export const excelUpdateTemplate = (data: object) => {
  var quer = qs.stringify(data);
  return http.request("post", "/api/memberManage/excelUpdateTemplate?" + quer);
};
