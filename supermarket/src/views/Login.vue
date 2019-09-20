<template>
    <div class="login" @keydown.13="subMit">
        <!-- 容器 -->
        <el-card class="box-card">
            <!-- 标题  -->
            <div slot="header" class="clearfix">
                <span class="el-icon-s-goods cfff">邓小三超市管理系统</span>
            </div>
            <!-- 内容-->
            <el-form :model="user" status-icon :rules="rules" ref="loginForm" label-width="80px">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doLogin">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    //直接解构api接口对象中的需要的api方法
    import {login} from "@/api/apis.js";

    export default {
        data() {
            return {
                user: {
                    //初始化对象
                    username: '',
                    password: '',
                },
                // 验证规则对象
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 8, message: '用户名长度字符在2-8之间'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '密码长度字符在3-10之间'}
                    ]
                }
            };
        },
        // 方法
        methods: {
            resetForm() {
                this.$refs.loginForm.resetFields();
            },

            doLogin() {
                //缓存的this
                const _this = this; //vue对象

                this.$refs.loginForm.validate(valid => {
                    //判断
                    if (valid) {
                        // 发送请求提交登录信息
                        login(_this.user)
                            .then((result) => {
                                //判断
                                if (result.success) { //判断是否传入
                                    this.$message({
                                        message: '恭喜您输入正确，登陆成功！！！',
                                        type: 'success',
                                        duration: 500,
                                        onClose() {
                                            //把tokenID保存在本地
                                            localStorage.setItem('token', result.token)
                                            //替换路由
                                            _this.$router.replace('./home');
                                        }
                                    });
                                } else {
                                    //错误就返回提示
                                    this.$message({
                                        message: '您输入有误，登陆失败！！！',
                                        type: 'error',
                                        duration: 1500,
                                    });
                                }
                            })
                    }
                })

            },
            subMit() {
                this.doLogin();
            }
        },

        mounted(){
            localStorage.removeItem('token');
        }
    };
</script>
<style lang="less">
    .login {
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .el-card {
            width: 500px;
            background-color: #141C23;
        }
        .cfff {
            color: #fff;
            display: flex;
            font-size: 20px;
            justify-content: center;
        }
    }
</style>