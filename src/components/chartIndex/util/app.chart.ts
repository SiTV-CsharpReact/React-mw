import { chartIndex } from "../../../models/chartIndex";
var xmin, xmax;
var g_IsWorkingDay;

var c_strVNXALL = "VNXALL",//2016-10-31 11:51:11 NamLD update VNXALL
    c_strVNIndex = "VNI",
    c_strVN30 = "VN30",
    c_strVN100 = "VN100",
    c_strVNALL = "VNALL",
    c_strVNMID = "VNMID",
    c_strVNSML = "VNSML",
    c_strHNX30 = "i41",
    c_strHNX30TRI = "i51",
    c_strHNXCon = "i311",
    c_strHNXFin = "i39",
    c_strHNXIndex = "i02",
    c_strHNXLCap = "i26",
    c_strHNXMSCap = "i28",
    c_strHNXMan = "i310",
    c_strHNXUpcomIndex = "i03",
    c_strHNXUpcomPremium = "i218";//2016-07-14 10:35:12 NamLD update Upcom Premium

var c_strhourOPENMKT = 9,
	c_strhourCLOSEMKT = 15
export function initXDatetime(objCInitData:chartIndex) {
    var today = new Date();
    var hh = today.getHours();
    var mi = today.getMinutes();
   var  g_IsWorkingDay = objCInitData.IsWorkingDay;
    //g_IsWorkingDay = "0"; //TEST ngay nghi, ngay le tet
    if (g_IsWorkingDay == "0" || (g_IsWorkingDay == "1" && (hh < 8 || (hh == 8 && mi <= 15)))) {
        var HNX30, VNI;
        HNX30 = objCInitData.HNX.DataFull.HNX30;
        VNI = objCInitData.HSX.DataFull.VNIndex;
        if (HNX30.length != 0) {
            xmin = HNX30[0].Data.TimeJS;
            xmax = HNX30[HNX30.length - 1].Data.TimeJS;
        } else {
			// 2021-07-03 14:19:56 ngocta2 fix error so am, pool tra client 0-size array
			if (VNI.length > 0) {
				xmin = VNI[0].Data.TimeJS;
				xmax = VNI[VNI.length - 1].Data.TimeJS;
			}
        }
    }
    else// (g_IsWorkingDay == "1") 
    {


        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();
        var HH1 = c_strhourOPENMKT;
        var HH2 = c_strhourCLOSEMKT;
        var MM = 0; // minute

       var  xminTmp = new Date(yyyy, mm, dd, HH1, MM);
       var xmaxTmp = new Date(yyyy, mm, dd, HH2, MM);

        xmin = _getDateTs(xminTmp);
        xmax = _getDateTs(xmaxTmp);
    }
}
function _getDateTs(dateTime:any) {
 
    var d;
    d = dateTime.getTime();
    if (!isNaN(d)) {
        return d;
    }
    dateTime = dateTime.toString().replace(/-/g, ' '); //1 Jan 2010 works but 1-Jan-2010 doesn't
    d = new Date(dateTime).getTime();
    if (!isNaN(d)) {
        return d;
    }
    // may be what we've is a time stamp. 
    if ((d = parseInt(dateTime)) > 100000) {
        // we are not handling something that's up on 1st Jan 1971, as yet.
        // assume it is a valid time stamp and just send it back.
        return d;
    }
};