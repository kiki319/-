<template>
    <div>
        <div>
            <template>
                <el-select v-model="line" placeholder="请选择线路">
                    <el-option
                        v-for="item in lines"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div style="margin: 20px"></div>
        <h3 v-show="isActive">请选择路线！</h3>
        <el-button @click="checkLine" type="primary" icon="el-icon-search">查询</el-button>
        <LineQueryResult v-show="isShow" :line="line" :isActive="isActive"></LineQueryResult>
    </div>
</template>

<script>
    import {getBaseData} from "../../../network/basedata";
    import LineQueryResult from "./LineQueryResult";

    export default {
        name: "Lines",
        components: {LineQueryResult},
        data(){
            return{
                isShow: false,
                lines: null,
                isActive: false,
                line: ''
            }
        },
        created() {
            this.getData()
        },
        methods: {
            checkLine(){
                if(this.line.length>0){
                    this.isActive = false
                    this.isShow = true
                    this.$refs.child.queryResult(this.line)
                }else {
                    this.isActive = true
                    this.isShow = false
                }
                return;
            },
            getData() {
                getBaseData().then(res => {
                    console.log("是否请求成功！", res.data)
                    this.lines = res.data.lines
                })
            }
        }

    }
</script>

<style scoped>

</style>