<template>
  <div>
    <template>
      <transition name="el-fade-in">
        <div>
          <h3>{{start+" 至 "+end}} 途经站点</h3>
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
  import {getTransferData} from "../../../network/basedata";

  export default {
    name: "TransferQueryResult",
    props: {
      start: {
        type: String,
        default: '北工大西门',
        required: true
      },
      end: {
        type: String,
        default: '天安门西',
        required: true
      }
    },
    data(){
      return{
        tableData: [{
          'name': '',
          'change': ''
        }]
      }
    },
    methods: {
      queryResult(start,end){
        getTransferData(start,end).then(res => {
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
    }
  }
</script>

<style scoped>

</style>