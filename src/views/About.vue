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
        <el-form-item label="请选择时间:">
          <div class="block">
            <el-date-picker v-model="report.time" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <el-input
        style="    padding: 25px;    box-sizing: border-box;"
        type="textarea"
        rows="8"
        cols="40"
        v-model="report.time"
      ></el-input>
      <el-button>取消上传</el-button>
      <el-button type="primary">确认上传</el-button>
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
          <div class="block">
            <el-date-picker
              v-model="query.querytime"
              type="date"
              placeholder="选择日期"
              style="width:140px"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item style="position: absolute;left: 280px;width: 140px;">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-collapse
        style="    text-align: left;padding: 15px;box-sizing: border-box;"
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item title="一致性 Consistency" name="1" style="    position: relative;">
      
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            <el-tag type="danger" style="float: right;margin-top: -32px;">删除</el-tag>
        </el-collapse-item>

        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      activeNames: ["1"],
      report: {
        city: "",
        time: ""
      },
      query: {
        querycity: "",
        querytime: ""
      },
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
    },
    handleChange(val) {
      console.log(val);
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
