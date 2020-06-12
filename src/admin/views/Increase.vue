<template>
  <div>
    <LineInput @getLine="increaseLine"></LineInput>
    <StationInput :line="line" :err="err" @getStation="increaseStation"></StationInput>
    <TimeInput @getTime="increaseTime"></TimeInput>
    <div>
      <div style="margin: 40px"></div>
        <el-button @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import LineInput from "../inputbox/LineInput";
  import StationInput from "../inputbox/StationInput";
  import TimeInput from "../inputbox/TimeInput";
  import {increaseData} from "../../network/backstage";

  export default {
    inject: ['reload'],
    name: "Increase",
    components: {
      LineInput,
      StationInput,
      TimeInput
    },
    data() {
      return{
        line: '',
        station: '',
        time: 2,
        btnShow: false,
        show: false,
        err: '请输入非重复的站点名'
      }
    },
    computed: {
      inputValue() {
        const  {line,station,time,show} = this
        return {
          line,
          station,
          time,
          show
        }
      }
    },
    methods: {
      increaseLine(line){
        this.line = line
      },
      increaseStation(station,show){
        this.station = station
        this.show = show
        console.log("show的值",this.show);
      },
      increaseTime(time){
        this.time = time
      },
      save(){
        if (this.btnShow === true){
          console.log("保存成功");
          increaseData(this.line,this.station,this.time)
          this.$message.success("保存成功！");
          this.reload()
        } else {
          console.log("保存失败");
          this.$message.error("保存失败！");
        }

      }
    },
    watch: {
      inputValue(val) {
          if (val.line.length>=1 && val.station.length>=1 && val.time>0 && val.show===false) {
            this.btnShow = true
            console.log("btnShow的值",this.btnShow);
          } else {
            this.btnShow = false
            console.log("btnShow的值",this.btnShow);
          }
      }
    }
  }
</script>

<style scoped>

</style>