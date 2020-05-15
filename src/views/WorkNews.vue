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
        <el-form-item label="请选择时间:">
          <div class="block">
            <el-date-picker
              v-model="report.time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <el-input
        style="padding: 25px;box-sizing: border-box;"
        type="textarea"
        rows="5"
        placeholder="请输入内容..."
        v-model="report.textarea"
      ></el-input>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <div style="    margin-top: 120px;">
        <el-button @click="delUpload">取消上传</el-button>
      <el-button type="primary" @click="isOkUpload">确认上传</el-button>
      </div>
    </div>
    <div class="homeright">
      <h3>查询报告</h3>
      <el-form ref="query" :model="query" label-width="90px" style="height: 50px;">
        <el-form-item style="    position: absolute;left: 15px;">
          <el-select v-model="treecityname" placeholder="选择地区">
            <el-option :value="treecityname" style="height: auto">
              <el-tree :data="treecity" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-option>
          </el-select>
          <div></div>
        </el-form-item>
        <el-form-item style="position: absolute;left: 245px;">
          <div class="block">
            <el-date-picker
              v-model="query.querytime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item style="position: absolute;left: 480px;">
          <el-button type="primary" @click="queryreport">查询</el-button>
        </el-form-item>
      </el-form>
      <el-collapse
        style="text-align: left;padding: 15px;box-sizing: border-box;"
        @change="handleChange"
      >
        <el-collapse-item
          v-for="(itme,index) in activeNames"
          :key="index"
          :title="itme.name"
          :name="index"
          style="position: relative;"
        >
          <div>{{ itme.name }}</div>
          <el-tag type="danger" style="float: right;margin-top: -32px;" @click="delquery">删除</el-tag>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { citylist } from "@/request/api";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      activeNames: [
        { name: "111" },
        { name: "222" },
        { name: "333" },
        { name: "444" },
        { name: "555" },
        { name: "666" },
        { name: "777" }
      ],
      delrowcontent: "",
      report: {
        time: "",
        textarea: ""
      },
      treecity: [], //城市数据
      treecityname: "", //城市名
      treecityid: "", //城市code
      query: {
        querycity: "",
        querytime: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this.chengshi();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(val) {
      console.log(val);
      this.delrowcontent = val[val.length - 1];
      // this.delrowcontent = val
    },
    delUpload() {
      this.treecityname = "";
      this.treecityid = "";
      this.report.time = "";
      this.report.textarea = "";
    },
    isOkUpload() {
      // if(this.treecityname == '' ||this.treecityid =='' ||this.report.time =='' ||this.textarea ==''){
      //   alert('内容不能为')
      // }
      console.log(this.treecityname);
      console.log(this.treecityid);
      console.log(this.report.time);
      console.log(this.report.textarea);
      this.treecityname = "";
      this.treecityid = "";
      this.report.time = "";
      this.report.textarea = "";
    },
    queryreport() {
      console.log(this.treecityname);
      console.log(this.treecityid);
      console.log(this.query.querytime);
      this.treecityname = "";
      this.treecityid = "";
      this.query.querytime = "";
    },

    delquery() {
      this.activeNames.splice(this.delrowcontent, 1);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async chengshi() {
      const data = await citylist();
      let res = JSON.parse(data.data);
      this.treecity = res.data;
    },
    handleNodeClick(data) {
      this.treecityname = data.title;
      this.treecityid = data.id;
    }
  }
};
</script>
<style lang="less" scope>
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
    position: relative;
    textarea {
      resize: none;
    }
    // .el-upload-list--picture-card .el-upload-list__item {
    //   width: 100px;
    //   height: 100px;
    // }
    // .el-upload--picture-card {
    //   width: 100px;
    //   height: 100px;
    //   line-height: 100px;
    //   position: absolute;
    //   left: 26px;
    // }
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
  }
}
</style>
