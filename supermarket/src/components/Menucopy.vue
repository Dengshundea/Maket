<template>
    <div id="menu">
        <el-aside width="210px">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/images/home-logo.jpg"/>
                <div style="padding: 14px;">
                    <span class="cfff">邓小三</span>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button">个人信息</el-button>
                        <el-button type="text" class="button" @click="logout">注销</el-button>
                    </div>
                </div>
            </el-card>

            <el-menu
                    :default-active="$route.path"
                    class="menu-box"
                    background-color="rgb(48,65,86)"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    unique-opened
                    router>
                <div v-for="tree in treelist" key>
                <el-submenu :index="tree.index" :key="tree.index" v-if="tree.roles.includes(currentRole)">
                    <!--菜单名称-->
                    <template slot="title">
                        <i :class="tree.cls"></i>
                        <span>{{tree.title}}</span>
                    </template>
                    <el-menu-item :key="item.index" v-for="item in tree.children" :index="item.index">{{item.name}}</el-menu-item>
                </el-submenu>
                </div>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    import {getLoginUserRole} from '@/api/apis';
    export default {
        data() {
            return {
                currentDate: new Date(),
                // 动态菜单创建
                treelist: [
                    {
                        index: "1",
                        cls: "el-icon-s-cooperation",
                        title: "商品管理",
                        roles:[1], //超级管理员
                        children: [
                            { index: "/home/Product", name: "商品列表" },
                            { index: "/home/AddProduct", name: "添加商品" }
                        ]
                    },
                    {
                        index: "2",
                        cls: "el-icon-s-goods",
                        title: "账号管理",
                        roles:[1], //超级管理员
                        children: [
                            { index: "/home/User", name: "账号管理" },
                            { index: "/home/ChangePassword", name: "修改密码" },
                            { index: "/home/AddUser", name: "增加账号" }
                        ]
                    },
                    {
                        index: "3",
                        cls: "el-icon-circle-plus",
                        title: "进货管理",
                        roles:[1,2], //超级管理员/普通员工
                        children: [
                            { index: "/home/shopStock", name: "库存管理" },
                            { index: "/home/addStock", name: "添加库存" }
                        ]
                    },
                    {
                        index: "4",
                        cls: "el-icon-remove",
                        title: "出货管理",
                        roles:[1,2], //超级管理员/普通员工
                        children: [
                            { index: "/home/clear", name: "销售列表" },
                            { index: "/home/clearout", name: "商品出库" },
                            { index: "/home/clearback", name: "商品退货" }
                        ]
                    },
                    {
                        index: "5",
                        cls: "el-icon-s-data",
                        title: "统计管理",
                        roles:[1], //超级管理员
                        children: [
                            { index: "/home/sta", name: "销售统计" },
                            { index: "/home/stocksta", name: "进货统计" }
                        ]
                    },
                    {
                        index: "6",
                        cls: "el-icon-s-custom",
                        title: "会员管理",
                        roles:[1], //超级管理员
                        children: [
                            { index: "/home/x", name: "账号管理" },
                            { index: "/home/l", name: "添加账号" }
                        ]
                    }
                ],
                currentRole:''
            };
        },
        methods: {
            logout(){
                //点击注销信息切换到登陆页面
                this.$router.replace('/login')
            }
        },
        //页面加载完毕
        mounted(){
            //获取token
            const token = localStorage.getItem('token');
            const _this =this;
            getLoginUserRole({token}) //拿到的是一个对象
                .then(rusult=>{
                    if(rusult.success){
                        //alert('用户角色:'+rusult.role);
                        _this.currentRole = rusult.role
                    }
                    //alert('用户角色:'+result.role);
                })
        },
        computed: {

        }
    }
</script>

<style lang="less" scoped> //scoped开启范围控制，避免全局污染
#app {

    background-color: pink;
}
</style>