import Cookies from "js-cookie";
import { storageLocal } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";
import { getSite } from "@/api/user";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T | string;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 头像 */
  avatar?: string;
  /** 用户名 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
}

export const userKey = "user-info";
export const TokenKey = "authorized-token";
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = "multiple-tabs";

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

function generateRandomToken(length) {
  // 可选字符集，包括大小写字母和数字
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // 初始化空字符串用于存储结果
  let result = "";

  // 循环生成随机字符
  for (let i = 0; i < length; i++) {
    // 生成0到charset.length之间的随机索引
    const randomIndex = Math.floor(Math.random() * charset.length);

    // 将随机索引对应的字符添加到结果字符串
    result += charset.charAt(randomIndex);
  }

  // 返回结果字符串
  return result;
}

function getDate() {
  // 创建一个Date对象表示当前时间
  let currentDate = new Date();

  // 设置日期为当前日期一个月之后
  let futureDate = new Date(currentDate.getTime());
  futureDate.setMonth(futureDate.getMonth() + 1);

  // 将日期格式化为所需的格式
  let year = futureDate.getFullYear();
  let month = ("0" + (futureDate.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以加1
  let day = ("0" + futureDate.getDate()).slice(-2);
  let hours = ("0" + futureDate.getHours()).slice(-2);
  let minutes = ("0" + futureDate.getMinutes()).slice(-2);
  let seconds = ("0" + futureDate.getSeconds()).slice(-2);

  // 构建格式化的字符串
  let formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

  // 输出格式化的日期
  return formattedDate;
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`refreshToken`、`expires`这六条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */

export function setToken(data: DataInfo<Date>) {
  console.log(data);

  if (!data) {
    data = {
      avatar: "",
      accessToken: generateRandomToken(15),
      refreshToken: generateRandomToken(12),
      nickname: "YY",
      roles: ["admin"],
      expires: getDate()
    };
  }

  let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
          expires: loginDay
        }
      : {}
  );

  residentInfoPageGet();

  function residentInfoPageGet() {
    getSite().then((res: any) => {
      if (res.status === 10001000) {
        Cookies.set("siteMessage", JSON.stringify(res.data));
      }
    });
  }

  function setUserKey({ avatar, username, nickname, roles }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    storageLocal().setItem(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles
    });
  }

  if (data.username && data.roles) {
    const { username, roles } = data;
    setUserKey({
      avatar: data?.avatar ?? "",
      username,
      nickname: data?.nickname ?? "",
      roles
    });
  } else {
    const avatar =
      storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "";
    const username =
      storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
    const nickname =
      storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    setUserKey({
      avatar,
      username,
      nickname,
      roles
    });
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
