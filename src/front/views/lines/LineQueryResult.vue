<template>
  <div>
    <template>
      <transition name="el-fade-in">
        <div>
          <h3>{{line}} 途经站点</h3>
          <el-table :data="tableData">
            <el-table-column label=" " align="center">
              <template slot-scope="scope">
                <b>{{ scope.row.name }}</b>&nbsp;
                <template v-if="scope.row.change">
                  <i class="el-icon-refresh" style="font-size: 9px;color: gray"> 换乘 {{scope.row.change}}</i>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
  import {getLineData} from "../../../network/basedata";

  export default {
    name: "LineQueryResult",
    props: {
      line: {
        type: String,
        default: '北工大西门',
        required: true
      }
    },
    data(){
      return{
        tableData: [{
            'name': '天安门东',
            'change': '1号线'
        }]
      }
    },
    created() {
      this.queryResult(this.line)
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
      }
    },
    watch: {
      line: {
        handler(){
          this.queryResult(this.line)
        }
      }
    }
  }
</script>

<style scoped>

</style>