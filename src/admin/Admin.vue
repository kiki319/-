<template>
  <div>
    <div id="main-box" class="center-box">
      <div style="margin: 20px"></div>
      <img src="@/assets/logo.jpg" width="50px">
      <h1>北京地铁出行线路后台管理系统</h1>
      <div style="margin: 50px"></div>
      <div id="content-common" class="center-box">
        <ul class="carbtn">
          <router-link to="increase" tag="li" replace>
            <span class="metro-span">增加站点</span>
          </router-link>
          <router-link to="delete" tag="li" replace>
            <span class="metro-span">删除站点</span>
          </router-link>
          <router-link to="edit" tag="li" replace>
            <span class="metro-span">修改站点</span>
          </router-link>
        </ul>
          <div v-if="isActive === 'increase'" class="arrow-wrap-increase"></div>
          <div v-if="isActive === 'delete'" class="arrow-wrap-delete"></div>
          <div v-if="isActive === 'edit'" class="arrow-wrap-edit"></div>
      </div>
<!--        <router-link to="increase" replace>增加站点</router-link>-->
<!--        <router-link to="delete" replace>增加站点</router-link>-->
<!--        <router-link to="edit" replace>修改站点</router-link>-->
        <div style="margin: 20px"></div>
      <div>
        <router-view></router-view>
      </div>
      <div style="margin: 30px;font-size: 9px;color: gray">
        Copyright &copy; <a href="" style="color:#409EFF">chengjiaqi</a> All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Admin",
    data() {
      return {
        increasePath: '/admin/increase',
        deletePath: '/admin/delete'
      }
    },
   computed: {
      isActive() {
        if (this.$route.path === this.increasePath) {
          return 'increase'
        } else if (this.$route.path === this.deletePath) {
          return 'delete'
        } else {
          return 'edit'
        }
      }
   }
  }
</script>

<style scoped>
  .active{
    color: #409EFF;
  }
  .center-box{
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
  }
  #main-box {
    font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    width: 600px;
    margin: 50px 0;
    text-align: center;
  }

  #content-common {
    text-align: center;
    font-size: 12px;
    font-family: Arial,Helvetica,SimSun,sans-serif;
    pointer-events: auto;
    user-select: none;
    border-bottom: 1px solid #A3C7FF;
    text-decoration: none;
    box-sizing: border-box;
    width: 329px;
    height: 38px;
  }

  .carbtn{
    display: flex;
    text-align: justify;
  }

  .metro-span {
    line-height: 37px;
    text-align: center;
    cursor: pointer;
    margin-left: 8px;
  }

  li{
    width: 350px;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    float: left;
  }

  .arrow-wrap-increase {
    position: absolute;
    height: 6px;
    width: 6px;
    background: #fff;
    border-top: 1px solid #A5C4FF;
    border-left: 1px solid #A5C4FF;
    transform: rotate(45deg);
    top: 34px;
    transition: left .2s ease-in;
    left: 23%;
  }

  .arrow-wrap-delete {
    position: absolute;
    height: 6px;
    width: 6px;
    background: #fff;
    border-top: 1px solid #A5C4FF;
    border-left: 1px solid #A5C4FF;
    transform: rotate(45deg);
    top: 34px;
    transition: left .2s ease-in;
    left: 53%;
  }

  .arrow-wrap-edit {
    position: absolute;
    height: 6px;
    width: 6px;
    background: #fff;
    border-top: 1px solid #A5C4FF;
    border-left: 1px solid #A5C4FF;
    transform: rotate(45deg);
    top: 34px;
    transition: left .2s ease-in;
    left: 83%;
  }
</style>