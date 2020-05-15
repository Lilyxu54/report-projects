<template>
  <div class="home">
    <div class="homeleft">
      <h3 style="font-size:16px;color:#333333;">上传报告</h3>
      <el-form ref="report" :model="report" label-width="90px">
        <el-form-item label="选择地区:">
          <el-select v-model="treecityname" placeholder="选择地区">
            <el-option :value="treecityname" style="height: auto">
              <el-tree :data="treecity" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-option>
          </el-select>
          <div></div>
        </el-form-item>
        <el-form-item label="报告类型:">
          <el-select v-model="ProductActive" placeholder="选择报告类型" @change="changeProduct($event)">
            <el-option v-for="itme in reporttype" :key="itme.id" :value="itme.name">{{itme.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告种类:">
          <el-select
            v-model="reportkindselected"
            placeholder="选择报告种类"
            @change="changereportkind($event)"
          >
            <el-option
              v-for="(itme,index) in reportkind"
              :key="index"
              :value="itme.report_type"
            >{{itme.report_type}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告时间：">
          <div class="block" style="margin-left:-90px;">
            <el-date-picker
              v-model="value1"
              placeholder="选择报告时间"
              :type="datatime"
              :value-format="timeType"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        drag
        :action="importFileUrl"
        :data="upLoadData"
        multiple
        :on-success="(value)=> handleSuccess(value)"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
      </el-upload>
      <div style="margin-top: 50px;">
        <el-button @click="delFile">取消文件</el-button>
      <el-button type="primary" @click="uploadPDF">上传报告</el-button>
      </div>
    </div>
    <div class="homeright">
      <h3>查询报告</h3>
      <el-form ref="query" :model="query" label-width="90px" style="height: 50px;">
        <el-form-item style="position: absolute;left: 10px;width: 140px;">
          <el-select placeholder="选择地区" v-model="query.querycity">
            <el-option :value="treecityname" style="height: auto">
              <el-tree :data="treecity" :props="defaultProps" @node-click="querycityNodeClick"></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 160px;width: 140px;">
          <el-select v-model="query.querytype" placeholder="选择报告类型" @change="queryProduct($event)">
            <el-option v-for="itme in reporttype" :key="itme.id" :value="itme.name">{{itme.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 310px;width: 140px;">
          <el-select
            v-model="query.querykind"
            placeholder="选择报告种类"
            @change="queryreportkindevent($event)"
          >
            <el-option
              v-for="(itme,index) in queryreportkind"
              :key="index"
              :value="itme.report_type"
            >{{itme.report_type}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 460px;width: 140px;">
          <div class="block">
            <el-date-picker
              v-model="query.querytime"
              placeholder="选择报告时间"
              :type="querytimeType"
              :value-format="querydatatime"
              style="width:140px;position: absolute;right: 0px;top: 0px;width: 140px;z-index: 999999;"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item style="position: absolute;left: 572px;width: 140px;">
          <el-button type="primary" @click="queryreport">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%;height: 80%;overflow: auto;"  height="500">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报告时间" width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报告名称" width="160">
          <template slot-scope="scope">
            <p>{{ scope.row.report_kind }} {{ scope.row.report_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160">
          <template slot-scope="scope">
            <p>{{ scope.row.create_time }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click.native.prevent="handleDelete(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { citylist, getreport, reportFile, queryreport } from "@/request/api";
import moment from "moment";

export default {
  data() {
    return {
      report: {
        city: "",
        type: "",
        kind: "",
        time: ""
      },
      query: {
        querycity: "",
        querytype: "",
        querykind: "",
        querytime: ""
      },
      treecity: [], //城市数据
      treecityname: "", //城市名
      treecityid: "", //城市code
      querycityid: "", //城市查询code
      contreport: [], // all报告数据
      reporttype: [], //一级报告类型
      reportkind: "", //二级级报告种类
      queryreportkind: "", //二级级报告种类
      fileUrl: "", //接口获取路径
      fileName: "", //接口获取名称
      ProductActive: "", //一级报告selected值
      reportkindselected: "", //二级报告selected值
      querycontreport: [],
      queryreportinfo: {}, //查询接口参数
      importFileUrl:
        "https://lzypc.xiaomiqiu.com/rmt_pc/report/uploadReportFile", //测试接口
      upLoadData: {
        areaCode: "130403" // 行政区划（必传）
      },

      defaultProps: {
        children: "children",
        label: "title"
      },
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: "",
      datatime: "date", //monthrange year daterange
      timeType: "yyyy-MM-dd", //日期类型
      querytimeType: "daterange",
      querydatatime: "yyyy-MM-dd"
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 上传成功后的回调
    handleSuccess(value) {
      this.fileName = value.data.fileName;
      this.fileUrl = value.data.fileUrl;
    },
    async uploadPDF() {
      if (
        this.treecityid == "" ||
        this.ProductActive == "" ||
        this.reportkindselected == "" ||
        this.fileUrl == "" ||
        this.fileName == "" ||
        this.value1 == ""
      ) {
        alert("上传内容不能为空");
        return;
      }
      const data = await reportFile(
        this.treecityid,
        this.ProductActive,
        this.reportkindselected,
        this.fileUrl,
        this.fileName,
        this.value1
      );
      let msg = data.data;
      let msgdata = JSON.parse(msg);
      alert(msgdata.msg);
      this.treecityname = "";
      this.ProductActive = "";
      this.reportkindselected = "";
      this.fileUrl = "";
      this.fileName = "";
      this.value1 = "";
    },
    delFile() {
      this.fileUrl = "";
      this.fileName = "";
      alert("取消成功");
    },
    handleDelete(index, row) {
      row.splice(index, 1);
    },
    handleNodeClick(data) {
      this.treecityname = data.title;
      this.treecityid = data.id;
    },
    changeProduct(event) {
      this.ProductActive = event; //获取option对应的value值
      this.reportkindselected = " ";
      this.report.kind = "";
      if (this.ProductActive == "空气质量报告") {
        this.reportkind = this.contreport[0].reportTypes;
      } else if (this.ProductActive == "重污染天气报告") {
        this.reportkind = this.contreport[1].reportTypes;
      } else if (this.ProductActive == "激光雷达报告") {
        this.reportkind = this.contreport[2].reportTypes;
      } else if (this.ProductActive == "微站报告") {
        this.reportkind = this.contreport[3].reportTypes;
      } else if (this.ProductActive == "大气源解析") {
        this.reportkind = this.contreport[4].reportTypes;
      } else if (this.ProductActive == "专项报告") {
        this.reportkind = this.contreport[5].reportTypes;
      }
    },
    changereportkind(event) {
      this.value1 = "";
      if (event == "日报") {
        this.timeType = "yyyy-MM-dd";
        this.datatime = "date"; //monthrange year daterange month
      } else if (
        event == "周报" ||
        event == "水平报告" ||
        event == "走航报告" ||
        event == "微站走航报告" ||
        event == "专项报告"
      ) {
        this.timeType = "yyyy-MM";
        this.datatime = "month";
      } else if (
        event == "月报" ||
        event == "季报" ||
        event == "年报" ||
        event == "秋冬季" ||
        event == "夏季" ||
        event == "大气源解析季报"
      ) {
        this.timeType = "yyyy";
        this.datatime = "year";
      }
    },

    querycityNodeClick(data) {
      this.query.querycity = data.title;
      this.querycityid = data.id;
    },
    queryProduct(event) {
      //一级查询报告类型
      this.query.querykind = "";
      this.query.querytype = event;
      if (this.query.querytype == "空气质量报告") {
        this.queryreportkind = this.querycontreport[0].reportTypes;
      } else if (this.query.querytype == "重污染天气报告") {
        this.queryreportkind = this.querycontreport[1].reportTypes;
      } else if (this.query.querytype == "激光雷达报告") {
        this.queryreportkind = this.querycontreport[2].reportTypes;
      } else if (this.query.querytype == "微站报告") {
        this.queryreportkind = this.querycontreport[3].reportTypes;
      } else if (this.query.querytype == "大气源解析") {
        this.queryreportkind = this.querycontreport[4].reportTypes;
      } else if (this.query.querytype == "专项报告") {
        this.queryreportkind = this.querycontreport[5].reportTypes;
      }
    },
    queryreportkindevent(event) {
      //二级查询报告种类
      this.query.querykind = event;
      this.query.querytime = "";
      if (event == "日报") {
        this.querytimeType = "daterange";
        this.querydatatime = "yyyy-MM-dd"; //monthrange year daterange month
      } else if (
        event == "周报" ||
        event == "水平报告" ||
        event == "走航报告" ||
        event == "微站走航报告" ||
        event == "专项报告"
      ) {
        this.querytimeType = "monthrange";
        this.querydatatime = "yyyy-MM";
      } else if (
        event == "月报" ||
        event == "季报" ||
        event == "年报" ||
        event == "秋冬季" ||
        event == "夏季" ||
        event == "大气源解析季报"
      ) {
        this.querytimeType = "year";
        this.querydatatime = "yyyy";
      }
    },
    async queryreport() {
        this.tableData = []
      //查询报告
      // this.querycityid
      // console.log( this.querycityid)
      // console.log( this.query.querytype)
      // console.log(  this.query.querykind)
      // console.log(this.query.querytime)
      // console.log(this.query.querytime[0])
      // console.log(this.query.querytime)
      this.queryreportinfo.areaCode = this.querycityid;
      this.queryreportinfo.reportKind = this.query.querytype;
      this.queryreportinfo.reportType = this.query.querykind;
      this.queryreportinfo.startDateTime = this.query.querytime[0];
      this.queryreportinfo.endDateTime = this.query.querytime[1];
      // console.log(this.queryreportinfo);
      const data = await queryreport(this.queryreportinfo);
      let res = JSON.parse(data.data);
      let contdata = res.data;
      for (let i = 0; i < contdata.length; i++) {
        this.tableData.push(contdata[i]);
      }
    
    },
    async chengshi() {
      const data = await citylist();
      let res = JSON.parse(data.data);
      this.treecity = res.data;
    },
    async getComments() {
      let res = await getreport();
      let data = JSON.parse(res.data);
      let data2 = data.data;
      for (let i = 0; i < data2.length; i++) {
        let obj = {};
        obj.id = data2[i].id;
        obj.name = data2[i].report_kind;
        this.reporttype.push(obj);
        this.contreport.push(data2[i]);
        this.querycontreport.push(data2[i]);
      }
    }
  },
  created() {
    this.chengshi();
    this.getComments();
  }
};
</script>
<style lang="less" scope>

// .el-date-picker {
//   margin-top: 12px;
//   position: fixed !important;
//   // z-index: 2045;
//   top: -49px !important;
//   right: 100px !important;
// }
.home {
  height: 100%;
  .homeleft {
    width: 35%;
    height: 100%;
    background: #ffffff;
    display: block;
    float: left;
    margin: 0px 15px 0px 0px;
    text-align: center;
  }
  .homeright {
    width: 63%;
    height: 100%;
    background: #ffffff;
    float: left;
    text-align: center;
    position: relative;
    .el-form-item__content {
      margin-left: 0 !important;
      margin-bottom: 0 !important;
    }
    h3 {
      font-size: 16px;
      color: #333333;
    }
    .el-form-item {
      display: inline-block;
    }
    .el-table th>.cell {
      text-align: center;
    }
  }
}
</style>
