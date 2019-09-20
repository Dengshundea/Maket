<template>
    <div id="adduser">
        <el-card class="box-card">
            <h2>欢迎您 <span>邓小三</span></h2>
            <p>添加管理员账号</p>
            <el-form :model="newUser" status-icon :rules="rules" ref="addUserForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="newUser.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="newUser.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="newUser.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newUser.email"></el-input>
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model.trim="newUser.role" placeholder="请选择用户角色类型>">
                        <el-option label="--请选择--" value=""></el-option>
                        <el-option label="普通员工" value="1"></el-option>
                        <el-option label="超级管理员" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addUser">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    //直接解构api接口对象中的需要的api方法
    import { addUser } from "@/api/apis.js";
    export default {
        data() {
            // 缓存全局this
            const _this = this;

            // 自定义验证函数
            // rule 验证规则对象,可以拿到验证函数
            // value输入框的值(验证的核心数据)
            // callback 结果回调函数
            const validatePass = function(rule,value,callback){
                // 正则规则
                const reg = /^[a-zA-z0-9]+$/


                if(value===''){
                    callback(new Error('密码不能为空!'))
                } else if(value && value.length<=6 ){
                    callback(new Error('密码必须不少于6位!'))
                } else if( !reg.test(value)){
                    callback(new Error('密码必须为字母或数字!'))
                } else{
                    callback() // 成功放行
                }
            }

            const validateCheckPass = function(rule,value,callback){

                if(value===''){
                    callback(new Error('密码不能为空!'))
                } else if(value!==_this.newUser.password){
                    callback(new Error('两次密码不一致!'))
                } else{
                    callback() // 成功放行
                }
            }

            return {
                newUser: {
                    username:'',
                    password:'',
                    checkPass:'',
                    role:''
                },
                    rules: {
                        //用户名
                        username: [
                            {required: true, message: '请输入用户名称', trigger: 'blur'},
                            {min: 2, max: 10, message: '用户名长度在 2 到 10 个字符', trigger: 'blur'}
                        ],
                        //密码
                        pass: [{validator: validatePass, trigger: 'blur'}],
                        //再次确认
                        checkPass: [{validator: validateCheckPass, trigger: 'blur'}],
                        //邮箱
                        email: [
                            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                        ],

                    }
                };
            },

        methods: {
            addUser(){
                const _this = this;
                addUser (this.newUser)
                    .then(data=>{
                        if(data.success){ //添加成功
                            //提示成功，跳转到用户列表
                            _this.$message({
                                message:data.message,
                                type:'success',
                                duration:500,//0.5秒自动关闭
                                onClose(){
                                    _this.$router.push('/home/User') //跳转到用户列表
                                }
                            });
                        }else{
                            //提示错误
                            _this.$message({
                                message:data.message,
                                type:'error'
                            });
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
    #adduser {
        .box-card {
            width: 100%;
            background-color: #fff;
        }
        .el-input {
            width: 35%;
            min-width: 400px;
        }
    }
</style>