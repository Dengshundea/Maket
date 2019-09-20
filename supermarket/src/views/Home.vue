<template>
    <div id="home">
        <el-container>
            <el-header>
                <h2>
                    <i class="el-icon-s-shop .mr40"></i>
                    邓小三超市管理系统
                </h2>
                <!-- 右侧用户信息 -->
                <span class="info" v-if="username===''">
                        <span style="cursor: pointer;text-decoration: underline" @click="logout">请重新登录</span>
                    </span>

                <span class="info" v-else>
                        <img src="../assets/images/icon_head.png" alt="加载失败"/>
                        <span class="username">{{username}}</span>
                    </span>
            </el-header>
            <el-container>
                <el-aside width="210px">
                    <is-menu/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
            <el-footer>
                &copy;COPYRIGHT 2018-2020 &emsp;邓小三超市 &emsp; 联系电话：8008208820
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    //导入
    import Menu from "@/components/Menu";
    import {getLoginUsername } from "../api/apis";

    export default {
        data() { //必须是一个函数
            //再返回前可以做一些特有的运算
            //将来在复用时，返回的字面量是新创建的，相互之间不会产生影响
            return {
                username: ''
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('token');
                //把路由切换到登陆页面
                this.$router.replace('/login') //注销结束后对登陆信息进行验证
            }
        },
        components: {
            'is-menu': Menu
        },
        mounted() {
            //全局this
            const _this = this;
            //获取token
            const token = localStorage.getItem('token');
            //token本地的是一个字符串

            getLoginUsername({token})
                .then(result => {

                    if (result.success) { //成功
                        _this.username = result.username;
                    } else {
                        //失败提示，跳转登录
                        _this.$router.replace('/home')
                    }
                })
        }
    }
</script>
<style lang="less">
    #home {

        .el-card {
            background-color: rgb(48, 65, 86);
            border: 0;
            .cfff {
                color: #fff;
            }
            .time {
                font-size: 13px;
                color: #999;
            }

            .bottom {
                margin-top: 13px;
                line-height: 12px;
                display: flex;
                justify-content: space-between;
            }

            .button {
                padding: 0;
                float: right;
            }

            .image {
                width: 100%;
                display: block;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }

            .clearfix:after {
                clear: both
            }
        }

        ul {
            border: 0;
        }
        height: 100%;
        display: flex;

        .el-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        /*h2{*/
        /*margin-left: 190px;*/
        /*}*/
        .el-header .info {
            display: flex;
            align-items: center;
            img {
                width: 40px;
            }
            .username {
                margin: 0 10px;
            }
        }

        .el-footer {
            font-size: 16px;
            font-weight: bold;
        }
        .el-header, .el-footer {
            background-color: #2d3a4b;
            text-align: center;
            line-height: 60px;
            color: #fff;
        }

        .el-aside {
            background-color: rgb(48, 65, 86);
            color: #333;
            text-align: center;

        }

        .el-main {
            background-color: #E9EEF3;
            color: #333;
        }

        body > .el-container {
            margin-bottom: 40px;
        }

        .el-container:nth-child(5) .el-aside,
        .el-container:nth-child(6) .el-aside {
            line-height: 260px;
        }

        .el-container:nth-child(7) .el-aside {
            line-height: 320px;
        }
    }


</style>