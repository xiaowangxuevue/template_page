import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { sm4 } from "sm-crypto";

// 当前协议+域名+路径
export const currentUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  window.location.pathname;

// 获取cookies
function getCookie(name) {
  var prefix = name + "=";
  var start = document.cookie.indexOf(prefix);

  if (start == -1) {
    return null;
  }
  var end = document.cookie.indexOf(";", start + prefix.length);
  if (end == -1) {
    end = document.cookie.length;
  }

  var value = document.cookie.substring(start + prefix.length, end);
  return decodeURIComponent(value);
}
// 获取cookie值
let Base64 = require("js-base64").Base64;
export function getCookieItem(name) {
  if (getSessionItem("Authorization")) {
    const cookie = getSessionItem("Authorization").split(".")[1];
    const cookieObj = JSON.parse(Base64.decode(cookie));
    const cookieSub = JSON.parse(cookieObj.subject);
    return cookieSub[name];
  }
}

function getSessionItem(name) {
  return sessionStorage.getItem(name);
}


/**
 * 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days 天数
 * @param {String} path 目录
 */
export function setCookie(name, value, days, path) {
  let expires = new Date();
  expires.setTime(expires.getTime() + days * 3600000 * 24);
  path = path ? "" : ";path=" + path;
  let _expires =
    typeof days == "string" ? "" : ";expires=" + expires.toUTCString();
  document.cookie = name + "=" + value + _expires + path;
}

// 环境判断
export const ua = window.navigator.userAgent.toLowerCase();
export let isModel = "";
if (ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1) {
  //安卓手机
  isModel = "Android";
} else if (ua.indexOf("iPhone") > -1) {
  //苹果手机
  isModel = "IOS";
}
export const isWeiXin =
  ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;

// 请求头信息 cookie
export const headerPath = {
  Authorization: getSessionItem("Authorization") ? getSessionItem("Authorization") : getCookie("Authorization"),
};

export let imagePath = "";
export let linkPath = "";
export let urlPath = "";

let protocol = window.location.protocol + "//";
imagePath = protocol + process.env.VUE_APP_IMAGE;
linkPath = protocol + process.env.VUE_APP_LINK;
urlPath = protocol + process.env.VUE_APP_URL;

// 手机校验
export function checkPhone(phone) {
  if (!/^(1[0-9])\d{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
}

// 时间戳转换
export function formateDate(dateString) {
  let pattern = /(\d{4})(\d{2})(\d{2})/;
  let formatedDate = dateString.replace(pattern, "$1/$2/$3");
  let date = new Date(formatedDate);
  return date;
}
// 使用正则表达式提取年月日时分秒
export function extractDateTime(dateTimeString) {
  const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
  const match = dateTimeString.match(regex);

  if (match) {
    const [, year, month, day, hours, minutes, seconds] = match;
    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    };
  }

  return null;
}

//获取本地时间
export function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds();
  return currentdate;
}

// 获取URL参数
export function getUrlParams(name) {
  let searchParam = "", // 搜索参数的值
    paramObj = {}; // 搜索参数的对象

  let hostUrl = window.location.href; // 获取默认URL或当前页面URL

  // 去除URL中的#
  if (hostUrl.indexOf("?") < hostUrl.indexOf("#")) {
    hostUrl = hostUrl.substring(0, hostUrl.indexOf("#"));
  }

  // 如果URL中包含?则进行处理
  if (hostUrl.indexOf("?") > -1) {
    searchParam = hostUrl.split("?")[1]; // 获取?之后的参数

    // 如果参数中包含&则将参数解析为对象
    if (searchParam.indexOf("&") > -1) {
      searchParam.split("&").forEach((item) => {
        // 将参数解析为对象
        paramObj[item.split("=")[0]] = item.split("=")[1];
      });
    } else {
      // 如果参数中只包含键值对，则直接将参数解析为对象
      paramObj[searchParam.split("=")[0]] = searchParam.split("=")[1];
    }
  }

  // 返回搜索参数的值
  return paramObj[name];
}

/**
 * px转rem
 * @param {Number} px
 * @param {Boolean} type
 * @return {String} 返回rem的数值
 */
export function pxTorem(px, type = true) {
  if (!type) {
    return px + "px";
  }
  const baseSize = 37.5;
  // const scale = document.documentElement.clientWidth / 375;
  // const fontSize = baseSize * Math.min(1, 2);
  return Number(px) / Number(baseSize) + "rem";
}

// 获取URL参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null && unescape(r[2]).length > 20) {
    return unescape(r[2]);
  } else {
    return null;
  }
}

let VUE_APP_KEY = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_KEY);
let VUE_APP_IV = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_IV);
const VUEAPPKEY = "de03cd621066c28c61a5590986d4cded";
// 参数加密处理
export function dataSetKey(obj) {
  const baseStr = JSON.stringify(obj),
    baseData = encryptBySM4(baseStr),
    dataObj = {
      timestamp: Date.parse(new Date()),
      data: baseData,
      serialNumber: uuidv4().replace(/-/g, ""),
    };
  return dataObj;
}
function encryptBySM4(message) {
  // SM4 使用16字节（128位）的密钥
  const encrypted = sm4.encrypt(message, VUEAPPKEY);
  return encrypted;
}
// AES加密 Pkcs7填充方式
export function encryptByAES(message) {
  let encrypted = CryptoJS.AES.encrypt(message, VUE_APP_KEY, {
    iv: VUE_APP_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
 * 数据解密
 * @param {String} data 密文
 * @returns {String} 返回明文
 */
export const decrypt = (message) => {
  // SM4 使用16字节（128位）的密钥
  const data = sm4.decrypt(message, VUEAPPKEY);
  return data;


  // let decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(data) }, VUE_APP_KEY, {
  //   iv: VUE_APP_IV,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7,
  // });

  // return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * 深克隆
 * @param {Number|String|Object|...} target 需克隆的对象
 * @return {Number|String|Object|...} 返回克隆后的对象
 */
export function deepClone(target) {
  let result;
  if (typeof target === "object") {
    if (Array.isArray(target)) {
      result = [];
      for (let i in target) {
        result.push(deepClone(target[i]));
      }
    } else if (target === null) {
      result = null;
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
  } else {
    result = target;
  }
  return result;
}

/**
 * 函数debounce用于延迟执行fn函数
 * @param {Function} fn - 要延迟执行的函数
 * @param {number} [delay=null] - 延迟的时间，默认为1500毫秒
 * @returns {Function} - 返回一个延迟后执行的函数
 */
export function debounce(fn, delay = null) {
  if (delay == null) {
    delay = 1500;
  }
  let _lastTime = null;
  return function () {
    let that = this;
    let _args = arguments;
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > delay || !_lastTime) {
      fn.apply(that, _args);  // 没有延迟时间或没有延迟时间结束则执行fn函数
      _lastTime = _nowTime;  // 更新延迟时间结束的时间
    }
  }
}
