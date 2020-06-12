<template>
  <div>
    <div style="margin: 40px"></div>
    <label>请选择路线：</label>
    <el-select v-model="line" placeholder="1号线" @change="getLine(line)">
      <el-option
              v-for="item in lines"
              :key="item"
              :label="item"
              :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {getBaseData} from "../../network/basedata";

  export default {
    name: "LineInput",
    data(){
      return{
        lines: null,
        line: null
      }
    },
    created() {
      this.getData()
    },
    methods: {
        getData() {
          getBaseData().then(res => {
            this.lines = res.data.lines
          })
        },
        getLine(line) {
        this.$emit("getLine", line)
      }
    }
  }
</script>

<style scoped>

</style>