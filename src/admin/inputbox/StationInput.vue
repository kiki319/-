<template>
  <div>
    <div style="margin: 40px"></div>
    <label>请输入站点名：</label>
      <el-input
              type="text"
              v-model.lazy="station"
              placeholder="地安门"
              style="width: 220px"
              @change="getStation(station,show)"
      >
      </el-input>
    <label v-if="show">
      <span>* {{err}}</span>
    </label>
  </div>
</template>

<script>
  import {getLineData} from "../../network/basedata";

  export default {
    name: "StationInput",
    props: {
      err: String,
      line: {
        type: String,
        required: true
      }
    },
    data() {
      return{
        active: 'active',
        station: '',
        show: false,
        tableData: [{
          'name': '天安门东',
          'change': '1号线'
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
      getStation(station,show){
        this.$emit("getStation",station,show)
      }
    },
    watch: {
      line: {
        handler() {
          this.queryResult(this.line)
        }
      },
      station: {
        handler() {
          this.queryResult(this.line)
          for (let item of this.tableData) {
            if (item.name === this.station) {
              this.show = true
              break
            } else {
              this.show = false
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>