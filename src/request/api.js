import requerst from './http'

// 报告页面接口

// 报告接口
export const getreport = () =>{
    return requerst({
        method:'GET',
        url:'/rmt_pc/report/selectReportTypeData'
    })
}
// 树城市
export const citylist = () =>{
    return requerst({
        method:'GET',
        url:'/rmt_pc/report/getRegionData',
        params: { 
            areakey: '130403',
            sendu: '4'
         }
    })
}
// 上传文件
export const reportFile = (areaCode,reportKind,reportType,fileUrl,fileName,reportTime) =>{
    return requerst({
        method:'POST',
        url:'/rmt_pc/report/uploadReportData',
        params: {
            areaCode:areaCode,//行政区划
            reportKind:reportKind,//报告一级分类
            reportType:reportType,//报告二级分类
            fileUrl:fileUrl,//从第二个接口中获取到文件路径
            fileName:fileName,//同上获取到文件的名称
            reportTime:reportTime,//上传的时间（yyyy     yyyy-MM    yyyy-MM-dd） 三种格式（字符串即可）
        }
    })
}
// 查询文件
export const queryreport = (queryreportinfo) =>{
    return requerst({
        method:'POST',
        url:'/rmt_pc/report/findReportFileList',
        params:{
            areaCode:queryreportinfo.areaCode,//用户登录的token
            reportKind:queryreportinfo.reportKind,//报告一级分类
            reportType:queryreportinfo.reportType,//报告二级分类
            startDateTime:queryreportinfo.startDateTime,//（格式根据时间插件不同变换）
            endDateTime: queryreportinfo.endDateTime //（可以为空  查询年 只需要开始时间）如果月不是传区间 也可以不传结束时间 
        }
    })
}

// 空气质量报送管理接口

// 上传接口
// 查询接口
// 删除接口


// 工作指导信息管理
// 上传接口
// 查询接口
// 删除接口