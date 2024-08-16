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

export type corporation = {
  id: number;
  createTime: string;
  corporationName: string;
};

export type corBackForm = {
  count: number;
  data: corporation[];
  msg: string;
  status: number;
  suns: string;
};

type operateSuccessfully = {
  count: any;
  data: any;
  msg: string;
  status: number;
  suns: any;
};

type caijiUser = {
  address: string;
  city: string;
  createTime: string;
  estate: string;
  fullName: string;
  id: number;
  province: string;
  puttime: string;
  street: string;
  tel: string;
  userBindQr: any;
  userName: string;
  village: string;
};

type corporationBindCaijiUser = {
  count: any;
  data: caijiUser[];
  msg: string;
  status: number;
  suns: any;
};

type companyEquipment = {
  activce: any;
  areaInfo: string;
  areaid: 2001;
  caijiUserName: any;
  ceilingWeight: 0;
  cityid: 361;
  collectUserId: any;
  companytype: any;
  createtime: string;
  emodel: any;
  ename: string;
  enumber: any;
  equipType: 1;
  equipmentNo: "";
  equipmentid: 6537;
  estateid: any;
  etype: any;
  expiretime: string;
  fullname: string;
  gpsCarId: 0;
  gpsImei: any;
  gpsSimCard: any;
  id: 23;
  ifUpdate: any;
  lastActiveTime: any;
  latitude: string;
  licensePlateNumber: string;
  longitude: string;
  macaddress: string;
  orderId: string;
  produceNumEquip: any;
  provinceid: any;
  saleId: string;
  streetid: number;
  tel: string;
  updatetime: string;
  username: string;
  videoSurveillanceEquipment: any;
  villageid: number;
  weighPortBaud: any;
  weightCmdIntervalMilli: any;
  weightStatus: any;
};

type companyEquipmentList = {
  count: any;
  data: companyEquipment[];
  msg: string;
  status: number;
  suns: any;
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

/** 获取公司列表信息 */
export const getCorporationUserList = data => {
  var quer = qs.stringify(data);
  return http.request<corBackForm>(
    "post",
    "/api/residentInfo/getCorporationUserList?" + quer
  );
};

/** 添加公司信息 */
export const addCorporationUser = data => {
  var quer = qs.stringify(data);
  return http.request<operateSuccessfully>(
    "post",
    "/api/residentInfo/addCorporationUser?" + quer
  );
};

/** 修改公司信息 */
export const editCorporationUser = data => {
  var quer = qs.stringify(data);
  return http.request<operateSuccessfully>(
    "post",
    "/api/residentInfo/editCorporationUser?" + quer
  );
};

/** 获取相关公司下绑定的采集员 */
export const getCorporationBindCaijiUser = data => {
  var quer = qs.stringify(data);
  return http.request<corporationBindCaijiUser>(
    "post",
    "/api/residentInfo/getCorporationBindCaijiUser?" + quer
  );
};

/** 解除公司与采集员的绑定 */
export const delCorporationBind = data => {
  var quer = qs.stringify(data);
  return http.request<operateSuccessfully>(
    "post",
    "/api/residentInfo/delCorporationBind?" + quer
  );
};

/** 获取公司设备列表 */
export const getCorporationBindEquip = data => {
  var quer = qs.stringify(data);
  return http.request<companyEquipmentList>(
    "post",
    "/api/residentInfo/getCorporationBindEquip?" + quer
  );
};
