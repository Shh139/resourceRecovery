import { http } from "@/utils/http";
import qs from "qs";

type equipment = {
  activce: any;
  areaInfo: string;
  areaid: number;
  caijiUserName: string;
  ceilingWeight: number;
  cityid: number;
  collectUserId: number;
  companytype: number;
  createtime: string;
  emodel: any;
  ename: any;
  enumber: any;
  equipType: string;
  equipmentNo: string;
  equipmentid: string;
  estateid: any;
  etype: any;
  expiretime: string;
  fullname: any;
  gpsCarId: string;
  gpsImei: any;
  gpsSimCard: any;
  id: any;
  ifUpdate: any;
  lastActiveTime: any;
  latitude: any;
  licensePlateNumber: string;
  longitude: any;
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

type equipmentList = {
  count: number;
  data: equipment[];
  msg: string;
  status: number;
  suns: any;
};

export const equipList = data => {
  var quer = qs.stringify(data);
  return http.request<equipmentList>(
    "post",
    "/api/equipment/equipList?" + quer,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    }
  );
};
