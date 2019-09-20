<template>
    <div id="changepassword">
        <h2>欢迎您</h2>
        <p>修改账号密码</p>
        <el-card class="box-card">
            <div slot="header">
                <span>修改密码</span>
            </div>
            <el-form :model="newUser" status-icon :rules="rules" ref="addUserForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldpassword">
                    <el-input type="password" v-model="newUser.oldpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                    <el-input type="password" v-model="newUser.newpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newcheckPass">
                    <el-input type="password" v-model="newUser.newcheckPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addForm()">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    //引入请求函数
    import { changePassword } from "@/api/apis";

    export default {
        data(){
            const _this=this;
            const pwdReg = function(value) {
                // 正则
                const reg = /^[A-Za-z0-9]+$/;
                return reg.test(value);
            };

            // rule: 当前验证字段（包含字段名和验证对象）
            // value 当前字段值
            // callback 结果回调，如果传入new Error(）对象，那么验证失败；反之验证成功
            const checkNewPwd = (rule, value, callback) => {
                if (value === "") {
                    // 非空提示
                    callback(new Error("新密码不能为空！"));
                } else if (!pwdReg(value)) {
                    callback(new Error("新密码只能是字符和数字!"));
                } else if (value !== _this.newUser.newcheckPass) {
                    callback(new Error("两次密码不一致！"));
                } else {
                    callback(); // 验证成功，放行
                }
            };

            const checkConfirmPwd = (rule, value, callback) => {
                if (value !== _this.newUser.newpassword) {
                    callback(new Error("两次密码不一致！"));
                } else {
                    // 再次验证新密码的内容合法
                    this.$refs.addUserForm.validateField("newpassword");
                    callback(); // 验证成功，放行
                }
            };
            return {
                newUser: {
                    oldpassword:'', //老密码
                    newpassword:'', //新密码
                    newcheckPass:'', //确定新密码
                },
                rules:{
                    //密码
                    oldpassword: [
                        { required: true, message: "请输入原始密码", trigger: "blur" }
                    ],
                    newpassword: [{ validator: checkNewPwd, trigger: "blur" }],
                    newcheckPass: [{ validator: checkConfirmPwd, trigger: "blur" }]
                }
            }

         },
        methods:{
            //提交
            addForm() {
                //全局this
                const _this =this;
                changePassword({
                    token:localStorage.getItem('token'),
                    password:this.newUser.oldpassword,
                    newpassword:this.newUser.newpassword
                }).then((result)=>{
                    if(result.success){ //修改密码成功
                        this.$message({
                            type:'success',
                            message:result.message,
                            duration:500,
                            onClose(){
                                _this.$router.push('/login')
                            }
                        });
                    }else{ //失败
                        this.$message({
                            type:'error',
                            message:result.message,
                            duration:500,
                        })
                    }
                })
            },
            //重置
            resetForm() {
                this.$refs.addUserForm.resetFields();
            }
        }
     }
</script>
<style lang="less" scoped>
    #changepassword{
        .box-card {
            width: 100%;
            background-color: #fff;
        }
    }
</style>