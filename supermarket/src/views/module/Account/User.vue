<template>
    <div id="user">
        <h2>欢迎您</h2>
        <p>查看所有管理员账号</p>
        <el-card class="box-card">
            <div slot="header">
                <span>账户管理</span>
            </div>
            <!-- 搜索表单 -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="searchForm.searchKey" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select v-model.number="searchForm.role" placeholder="用户角色">
                        <el-option label="---请选择---" value=""></el-option>
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="普通员工" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    stripe
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="username"
                        label="用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="role"
                        label="角色" :formatter="renderRole">
                </el-table-column>
                <el-table-column
                        prop="inputTime"
                        label="录入时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div class="block">-->
            <!--<span class="demonstration">完整功能</span>-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage4"-->
            <!--:page-sizes="[100, 200, 300, 400]"-->
            <!--:page-size="100"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="400">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </el-card>

        <!-- 用户修改对话框 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="editForm">
                <!-- 用户名 -->
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" auto-complete="off" disabled></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item label="邮箱">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <!-- 角色 -->
                <el-form-item label="角色">
                    <el-select v-model.number="editForm.role" placeholder="请选择角色">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="普通员工" :value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    //直接解构api接口对象中的需要的api方法
    import { listUser, deleteUser, updateUser,} from "@/api/apis.js";

    export default {

        data() {
            return {
                tableData: [
                    {
                        username: '',
                        email: '',
                        role: '',
                        inputTime: '',
                    },
                ],
                // dialog对话框的默认显示状态
                dialogFormVisible: false,
                editForm: {
                    id: '',
                    username: '',
                    email: '',
                    role: ''
                },
                searchForm:{
                    searchKey:'',
                    role:''
                }
            };
            }
        , methods: {
            // 查询用户
            doSearch(){
                const _this= this;

                listUser(this.searchForm)
                    .then(result =>{
                        // if(result.success){
                        _this.tableData = result;
                        // }
                    })
            },

            handleEdit(row) {   //数据回显
                // 显示对话框
                this.dialogFormVisible = true;
                // 手动把行数据,更新form对象上即可
                this.editForm = row;
            },
            // 列格式化函数
            // row    : 行数据对象
            // column : elementUI列组件对象
            // cellValue : 当前列的值
            // 指令解析V-TEXT : 索引
            renderRole(row, column, cellValue) {
                // 判断role的值为1,即管理员
                if (cellValue === 1) {
                    return '超级管理员'
                } else {// 判断role的值为2,即管理员
                    return '普通员工'
                }
            },

            // 更新用户
            updateUser() {
                const _this = this;

                updateUser(this.editForm).then(result => {  //成功时的回调
                    if (result.success) {
                        this.$message({
                            // 修改成功
                            type: "success",
                            message: result.message,
                            duration: 500,
                            onClose() {
                                // 先隐藏对话框
                                _this.dialogFormVisible = false;
                                // 刷新页面
                                _this.list();
                            }
                        });
                    } else {
                        this.$message({
                            // 删除失败
                            type: "error",
                            message: result.message
                        });
                    }
                });
            },

            //删除用户
            handleDelete(id) {
                const _this = this;
                this.$confirm('此操作将永久删除该用户, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        deleteUser({id}).then(result => {
                            if (result.success) {
                                this.$message({
                                    // 删除成功
                                    type: "success",
                                    message: result.message,
                                    duration: 500,
                                    onClose() {
                                        _this.list();
                                    }
                                });
                            } else {
                                this.$message({
                                    // 删除失败
                                    type: "error",
                                    message: result.message
                                });
                            }
                        });
                    })
                    .catch(() => {

                    });
            },
            //用户列表抽过来
            list() {
                //发送请求并加载数据
                listUser()
                    .then((data) => {
                        //把结果更新到数据对象，由双向绑定完成页面更新
                        this.tableData = data
                    })
            }
        },
        mounted() {
            this.list()
        }
    }
</script>
<style lang="less" scoped>
    #user {
        h2 {
            margin: 0;
        }
        .box-card {
            width: 100%;
            background-color: #fff;
        }
    }

</style>