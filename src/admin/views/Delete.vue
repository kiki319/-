<template>
  <div>
    <LineInput @getLine="deleteLine"></LineInput>
    <div style="margin: 40px"></div>
    <div>
      <label>要删除的站点：</label>
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
    <el-button @click="deleteStation">删除</el-button>
  </div>
</template>

<script>
  import LineInput from "../inputbox/LineInput";
  import {getLineData} from "../../network/basedata";
  import {deleteData} from "../../network/backstage";

  export default {
    inject: ['reload'],
    name: "Delete",
    components: {
      LineInput,
    },
    data() {
      return{
        line: '1号线',
        station: '',
        btnShow: false,
        tableData: [{
          'name': '',
          'change': ''
        }]
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
      deleteLine(line) {
        this.line = line
      },
      deleteStation() {
        if (this.btnShow === true) {
          deleteData(this.line,this.station)
          this.$message.success("删除成功！");
          this.reload()
        } else {
          this.$message.error("删除失败！");
        }

      }
    },
    computed: {
      inputValue() {
        const  {line,station} = this
        return {
          line,
          station
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
        if (val.line.length>=1 && val.station.length>=1) {
          this.btnShow = true
        } else {
          this.btnShow = false
        }
      }
    }
  }
</script>

<style scoped>

</style>