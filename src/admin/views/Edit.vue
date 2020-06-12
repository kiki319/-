<template>
  <div>
    <LineInput @getLine="editLine"></LineInput>
    <div style="margin: 40px"></div>
    <div>
      <label>要修改的站点：</label>
      <el-select v-model="station">
        <el-option
                v-for="item in tableData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div style="margin: 40px"></div>
    <div>
      <StationInput :line="line" :err="err" @getStation="getNewStation"></StationInput>
    </div>
    <div style="margin: 40px"></div>
    <el-button @click="editStation">修改</el-button>
  </div>
</template>

<script>
  import LineInput from "../inputbox/LineInput";
  import StationInput from "../inputbox/StationInput";
  import {getLineData} from "../../network/basedata";
  import {editData} from "../../network/backstage";

  export default {
    inject: ['reload'],
    name: "Edit",
    components: {
      LineInput,
      StationInput
    },
    data() {
      return{
        line: '1号线',
        station: '',
        newStation: '',
        show: false,
        btnShow: false,
        err: '请输入非重复的站点名',
        tableData: [{
          'name': '',
          'change': ''
        }]
      }
    },
    computed: {
      inputValue() {
        const  {line,station,newStation,show} = this
        return {
          line,
          station,
          newStation,
          show
        }
      }
    },
    methods: {
      queryResult(line){
        getLineData(line).then(res => {
          this.tableData = []
          for(let index in res.data){
            this.tableData.push({
              'name': res.data[index].name,
              'change': res.data[index].change
            })
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response)
          }
        })
      },
      editLine(line){
        this.line = line
      },
      getNewStation(newStation,show) {
        this.newStation = newStation
        this.show = show
      },
      editStation() {
        if (this.btnShow === true){
          console.log("修改成功");
          editData(this.station,this.newStation)
          this.$message.success("修改成功！");
          this.reload();
        } else {
          console.log("修改失败");
          this.$message.error("修改失败！");
        }
      }
    },
    watch: {
      line: {
        handler() {
          this.queryResult(this.line)
          this.station = ''
        }
      },
      inputValue(val) {
        if (val.line.length>=1 && val.station.length>=1 && val.newStation.length>=1 && val.show === false) {
          this.btnShow = true
          console.log(this.btnShow);
        } else {
          this.btnShow = false
          console.log(this.btnShow);
        }
      }
    }
  }
</script>

<style scoped>

</style>