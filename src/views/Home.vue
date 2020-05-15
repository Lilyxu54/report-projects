<template>
  <div class="home">
    <div class="homeleft">
      <h3 style="font-size:16px;color:#333333;">上传报告</h3>
      <el-form ref="report" :model="report" label-width="90px">
        <el-form-item label="选择地区:">
          <el-select v-model="report.city" placeholder="请选择选择地区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告类型:">
          <el-select v-model="report.type" placeholder="请选择报告类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告种类:">
          <el-select v-model="report.kind" placeholder="请选择报告种类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择时间:">
          <div class="block">
            <el-date-picker v-model="report.time" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div class="homeright">
      <h3>查询报告</h3>
      <el-form ref="query" :model="query" label-width="90px" style="    height: 50px;">
        <el-form-item style="position: absolute;left: 10px;width: 140px;">
          <el-select v-model="query.querycity" placeholder="请选择地区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 160px;width: 140px;">
          <el-select v-model="query.querytype" placeholder="请选择报告类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 310px;width: 140px;">
          <el-select v-model="query.querykind" placeholder="请选择报告种类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="position: absolute;left: 460px;width: 140px;">
          <div class="block">
            <el-date-picker
              v-model="query.querytime"
              type="date"
              placeholder="选择日期"
              style="width:140px"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item style="position: absolute;left: 572px;width: 140px;">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
