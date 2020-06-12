<template>
    <div>
        <div>
            <template>
                    <el-autocomplete
                    v-model="station"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入站点"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    >
                </el-autocomplete>

            </template>
        </div>
        <div style="margin: 20px"></div>
<!--        <dragMap @drag="dragMap" :lat="defaultLatitude" :lng="defaultLongitude"-->
<!--                 :searchKeyVal="defaultSearchAddress"></dragMap>-->
        <el-button @click="checkStation" type="primary" icon="el-icon-search">查询</el-button>
        <h3 v-show="isActive">此站点不存在！</h3>
        <StationQueryResult ref="child" v-show="isShow" :station="station"></StationQueryResult>
    </div>
</template>

<script>
    import {getBaseData} from "../../../network/basedata";
    import StationQueryResult from "./StationQueryResult";
    // import DragMap from "../dragMap";

    export default {
        name: "Stations",
        components: {
            StationQueryResult,
            // DragMap
        },
        data() {
            return{
                defaultSearchAddress: '天安门东',
                defaultLatitude: 116.401216,
                defaultLongitude: 39.907780,
                sites: null,
                station: '',
                isShow: false,
                isActive: false,
                likeArr:[]
            }
        },
        methods: {
            // dragMap(positionResult) {
            //     // console.log("值的类型为：",positionResult);
            // },
            checkStation() {
                let SArr= this.likeArr.filter(item=>{
                    return item.value==this.station
                })
                if(SArr.length>0){
                    this.isActive = false
                    this.isShow = true
                    this.$refs.child.queryResult(this.station)
                }else {
                    this.isActive = true
                    this.isShow = false
                }
                return;
            },
            querySearch(queryString, cb) {
                const sites = this.sites
                const results = queryString ? sites.filter(this.createFilter(queryString)) : sites
                let likeArr1 = []
                for (let item of results) {
                    likeArr1.push({value: item})
                }
                this.likeArr = likeArr1
                cb(this.likeArr)
            },
            createFilter(queryString) {
                return (site) => {
                    return (site.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
                }
            },
            handleSelect(item){
                console.log(item)
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