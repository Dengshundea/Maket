<template>
    <div id="addproduct">
            <h2>欢迎您 <span>邓小三</span></h2>
            <p>
                您可以在这里添加新的商品或者编辑已有的商品,
                添加新商品的同时也可以进行入库（入库必须有数量和进价，带*的必填）
            </p>
        <el-card class="box-card">
            <div slot="header">
                <span>添加商品</span>
            </div>
            <el-form :model="addUser" status-icon :rules="rules" ref="addShopForm" label-width="100px"
                     class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-form-item label="所属分类" prop="shoplist">
                                <el-select v-model.trim="addUser.shoplist" placeholder="请选择>">
                                    <el-option label="--请选择--" value=""></el-option>
                                    <el-option label="食品" value="1"></el-option>
                                    <el-option label="饮料" value="2"></el-option>
                                    <el-option label="酒类" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品售价" prop="shopPrice">
                                <el-input v-model="addUser.shopPrice"></el-input>元
                            </el-form-item>
                            <el-form-item label="商品进价" prop="Commodity">
                                <el-input v-model="addUser.Commodity"></el-input>元
                            </el-form-item>
                            <el-form-item label="商品重量" prop="shopKg">
                                <el-input v-model="addUser.shopKg"></el-input>
                            </el-form-item>
                            <el-form-item label="会员优惠" prop="Members">
                                <el-radio-group v-model="addUser.Members">
                                    <el-radio label="享受"></el-radio>
                                    <el-radio label="不享受"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="商品简介" prop="promotion">
                                <el-input type="textarea" v-model="addUser.promotion">
                                </el-input>
                                <p>不超过200汉字</p>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addShopFrom">立即添加</el-button>
                                <el-button @click="resetMsg">取消重置</el-button>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            <el-form-item label="商品名称" prop="shopName">
                                <el-input v-model="addUser.shopName"></el-input>
                            </el-form-item>
                            <el-form-item label="市场价" prop="marketPrice">
                                <el-input v-model="addUser.marketPrice"></el-input>元
                            </el-form-item>
                            <el-form-item label="入库数量" prop="shopAmount ">
                                <el-input v-model="addUser.shopAmount"></el-input>
                            </el-form-item>
                            <el-form-item label="商品单位" prop="CommodityUnit">
                                <el-input v-model="addUser.CommodityUnit"></el-input>
                            </el-form-item>
                            <el-form-item label="是否促销" prop="discounts">
                                <el-radio-group v-model="addUser.discounts">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    //直接解构api接口对象中的需要的api方法
    import { addProduct } from "@/api/apis.js";
    export default {
        data() {
            return {
                addUser: {
                    shoplist:'',
                    shopPrice:'',
                    Commodity:'',
                    shopKg:'',
                    Members:'',
                    promotion:'',
                    shopName: '',
                    marketPrice:'',
                    shopAmount:'', //商品数量
                    CommodityUnit:'', //商品单位
                    discounts:'', //折扣
                },
                rules: {
                    shoplist: [
                        {required: true, message: '请选择', trigger: 'blur'},
                        {type: 'text', message: '请选择', trigger: ['blur', 'change']}
                    ],
                    shopName:[
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {type: 'text', message: '请输入商品名称', trigger: ['blur', 'change']}
                    ],
                    shopPrice:[
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {type: 'text', message: '请输入商品名称', trigger: ['blur', 'change']}
                    ],
                }

            }

        }
        ,methods:{
            //立即添加
            addShopFrom(){
                //全局this
                const _this = this;
                addProduct(this.addUser)
                    .then(data=>{
                        if(data.success){//添加成功
                            //提示成功，跳转到用户列表
                            this.$message({
                                message:data.message,
                                type:'success',
                                duration:500,
                                onClose(){
                                    //跳转到商品列表
                                    _this.$router.push('./Product')
                                }
                            })
                        }else{
                            //提示错误
                            this.$message({
                                message:data.message,
                                type:'error',
                            })
                        }
                    })
            },
            resetMsg(){
                this.$refs.addShopForm.resetFields();
            }
        }
    }
</script>
<style lang="less" scoped>
    #addproduct {
        .box-card {
            width: 100%;
            background-color: #fff;
        }
        .el-input {
            width: 30%;
            min-width: 200px;
        }
        .el-textarea{
            width: 70%;
            min-width: 600px;
        }
    }
</style>