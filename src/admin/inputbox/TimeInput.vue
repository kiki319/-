<template>
  <div>
    <div style="margin: 40px"></div>
      <label>距离上一站的时间(min)：</label>
        <el-input
          type="number"
          v-model.lazy="time"
          placeholder=2
          style="width: 220px"
          @change="getTime(time)"
        >
        </el-input>
  </div>
</template>

<script>
  export default {
    name: "TimeInput",
    data() {
      return{
        time: 2
      }
    },
    methods: {
      getTime(time){
        this.$emit("getTime",time)
        let check_num = this.time
        check_num = check_num.replace(/[^\d]/g, '') // 清除“数字”和“.”以外的字符
        if (check_num.indexOf('.') < 0 && check_num != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          check_num = parseInt(check_num)
        }
        if (check_num === 0){
          check_num = 1
        }
        this.time = check_num;
      }
    }
  }
</script>

<style scoped>

</style>