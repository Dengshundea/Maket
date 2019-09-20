<template>
    <div id="addStock">
        <h2>欢迎您 <span>邓小三</span></h2>
        <p>
            添加管理商品库存
        </p>
        <el-card class="box-card">
            <div slot="header">
                <span>商品入库</span>
            </div>
            <el-form :model="StockList" status-icon :rules="rules" ref="StockForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="商品条形码" prop="barCode">
                    <el-input type="text" v-model="StockList.barCode" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input type="text" v-model="StockList.num" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="进价" prop="price">
                    <el-input type="text" v-model="StockList.price" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStock ">入库</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    //直接解构api接口对象中的需要的api方法
    import { addStock } from "@/api/apis.js";
    export default {
        data() {
            //必须是一个函数
            //再返回前可以做一些特有的运算
            //将来在复用时，返回的字面量是新创建的，相互之间不会产生影响
            return {
                StockList:{},
                rules:{
                    barCode:[
                    {required:true,message:'请输入条形码！',trigger: 'blur'},
                        {min:5,max:10,message:'条形码长度在5到10字符',trigger: 'blur'}
                    ],
                    num:[
                        {required:true,message:'请输入数量！',trigger: 'blur'},
                        {min:1,trigger: 'blur'}
                    ],
                    price:[
                        {required:true,message:'请输入进价！',trigger: 'blur'},
                        {min:1,trigger: 'blur'}
                    ]
                }
            }



        },
        methods: {
            addStock (){
                const _this = this;
                addStock(this.StockList)
                    .then((result)=>{
                        if(result.success){ //成功的提示
                            _this.$message({
                                message:result.message,
                                type:'success',
                                duration:500,//500秒自动关闭
                                onClose(){
                                    _this.$router.push('/home/shopStock') //跳转到用户列表
                                }
                            })

                        }else{ //失败的提示
                            _this.$message({
                                type:'error',
                                message:result.message
                            })

                        }
                    })
            }
        },
        // mounted:{
        //
        // }
    }
</script>

<style lang="less" scoped> //scoped开启范围控制，避免全局污染
#addStock {
    .box-card {
        width: 100%;
        background-color: #fff;
    }
    .el-input {
        width: 30%;
        min-width: 200px;
    }
}
</style>