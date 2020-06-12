<template>
    <div>
        <template>
            <transition name="el-fade-in">
                <div>
                    <el-table :data="tableData">
                        <el-table-column label=" " align="center">
                            <template slot-scope="scope">
                                <b>{{ scope.row.line }}</b>&nbsp;
                                <b>{{ scope.row.station}}</b>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </transition>
        </template>
    </div>
</template>

<script>
    import {getStationData} from "../../../network/basedata";

    export default {
        name: "StationQueryResult",
        data(){
            return{
                tableData: [{
                    'line': '',
                    'station': '',
                }]
            }
        },
        methods: {
            queryResult(station){
                getStationData(station).then(res => {
                    console.log(res);
                    this.tableData = []
                    for(let index in res.data){
                        this.tableData.push({
                            'line': res.data[index].line,
                            'station': res.data[index].station
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