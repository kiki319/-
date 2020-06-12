<template>
  <div>
    <div>
      <template>
        <el-autocomplete
                v-model="st1"
                :fetch-suggestions="querySearch1"
                placeholder="请输入起点站"
                :trigger-on-focus="false"
                @select="handleSelect"
        >
        </el-autocomplete>
        &nbsp;&nbsp;<b>至</b>&nbsp;&nbsp;
        <el-autocomplete
                v-model="st2"
                :fetch-suggestions="querySearch2"
                placeholder="请输入终点站"
                :trigger-on-focus="false"
                @select="handleSelect"
        >
        </el-autocomplete>
      </template>
    </div>
    <div style="margin: 20px"></div>
    <el-button @click="checkStation" type="primary" icon="el-icon-search">查询</el-button>
    <h3 v-show="isActive">此路线不存在！</h3>
    <TransferQueryResult ref="child" v-show="isShow" :start="st1" :end="st2"></TransferQueryResult>
  </div>
</template>
checkStation
<script>
  import {getBaseData} from "../../../network/basedata";
  import TransferQueryResult from "./TransferQueryResult";

  export default {
    name: "Transfer",
    components: {
      TransferQueryResult
    },
    data() {
      return{
        sites: null,
        st1: '',
        st2: '',
        isShow: false,
        isActive: false,
        likeArr1:[],
        likeArr2:[]
      }
    },
    methods: {

      checkStation() {
        let SArr= this.likeArr1.filter(item=>{
         return item.value==this.st1
        })
        let EArr= this.likeArr2.filter(item=>{
          return item.value==this.st2
        })

        if(SArr.length>0&&EArr.length>0&&this.st1!=this.st2){
          this.isActive = false
          this.isShow = true
          this.$refs.child.queryResult(this.st1,this.st2)
        }else {
          this.isActive = true
          this.isShow = false
        }
        return;
      },
      querySearch1(queryString, cb) {
        const sites = this.sites
        const results = queryString ? sites.filter(this.createFilter(queryString)) : sites
        let likeArr1 = []
        for (let item of results) {
          likeArr1.push({value: item})
        }
        this.likeArr1 = likeArr1
        cb(this.likeArr1)
      },
      querySearch2(queryString, cb) {
        const sites = this.sites
        const results = queryString ? sites.filter(this.createFilter(queryString)) : sites
        let likeArr2 = []
        for (let item of results) {
          likeArr2.push({value: item})
        }
        this.likeArr2 = likeArr2
        cb(this.likeArr2)
      },
      handleSelect(value){
        console.log(value)
      },
      createFilter(queryString) {
        return (site) => {
          return (site.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      },
      getData(){
        getBaseData().then(res => {
          this.sites = res.data.sites
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>

</style>