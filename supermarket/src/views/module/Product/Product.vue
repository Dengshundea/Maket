<template>
    <div id="product">
        <h2>欢迎您 <span>邓小三</span></h2>
        <p>
            查看已有的和所有的商品
        </p>
        <el-card class="box-card">
            <div slot="header">
                <span>商品管理</span>
            </div>
            <el-form :model="shopList" status-icon :rules="rules" ref="shopForm" label-width="100px"
                     class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-form-item label="所属分类" prop="shopGrouplist">
                                <el-select v-model.trim="shopList.shoplist" placeholder="请选择份分类>">
                                    <el-option label="--请选择分类--" value=""></el-option>
                                    <el-option label="食品" value="1"></el-option>
                                    <el-option label="生活用品" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            <el-form-item label="关键字：" prop="shopCode">
                                <el-input v-model="shopList.shopCode"></el-input>
                                (商品名称，条形码)
                                <el-button type="success" size="small" @click="shopSelect">查询</el-button>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <hr>
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="商品条形码"
                            prop="shopCode" v-model.number="shopList.shopCode">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="shopName" v-model.trim="shopList.shopName">
                    </el-table-column>
                    <el-table-column
                            label="所属分类"
                            prop="shoplist" v-model.trim="shopList.shoplist">
                    </el-table-column>
                    <el-table-column
                            label="售价（元）"
                            prop="shopPrice" v-model.number="shopList.shopPrice">
                    </el-table-column>
                    <el-table-column
                            label="促销价（元）"
                            prop="promotion" v-model.number="shopList.promotion">
                    </el-table-column>
                    <el-table-column
                            label="市场价（元）"
                            prop="marketPrice" v-model.number="shopList.marketPrice">
                    </el-table-column>
                    <el-table-column
                            label="库存"
                            prop="repertory" v-model.number="shopList.repertory">
                    </el-table-column>
                    <el-table-column
                            label="库存总额（元）"
                            prop="totalAmount" v-model.number="shopList.totalAmount">
                    </el-table-column>
                    <el-table-column
                            label="销售总额（元）"
                            prop="totalSales" v-model.number="shopList.totalSales">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit">编辑
                            </el-button>
                            <el-button wq
                                       size="mini"
                                       type="danger"
                                       @click="handleDelete">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <!--<div class="block">-->
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
    </div>
</template>
<script>
    //直接解构api接口对象中的需要的api方法
   import { listProudct } from "@/api/apis.js";

    export default {
        data() {
            return {
                shopList: {
                    //商品信息
                    shopCode: '',  //商品条形码
                    shopName: '', //商品名称
                    shoplist: '', //商品分类
                    shopPrice: '', //商品售价
                    promotion: '', //商品促销价
                    marketPrice: '', //市场价
                    repertory: '', //库存
                    totalAmount: '', //库存总额
                    totalSales: '' //销售总额
                },
                tableData: [{
                    shopCode: '1346549',
                    shopName: '王小虎',
                    shoplist: '牙刷',
                    shopPrice: '10.00',
                    promotion: '8.00',
                    marketPrice: '9.8',
                    repertory: 58,
                    totalAmount: '350078.00',
                    totalSales: '5000.00'
                 }
                ],
                search: '',
                rules: {}
            }
        },
        methods: {
            //编辑
            handleEdit() {

            },
            //删除
            handleDelete(i) {
                this.tableData.splice(i,1)
            },
            //点击查询时
            shopSelect() {

            }
        }
        ,mounted(){ //生命周期挂载完必
            listProudct()
            .then(data=>{
                this.tableData=data;
            })
        }

    }
</script>
<style lang="less" scoped>
    #product {
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