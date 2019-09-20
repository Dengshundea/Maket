<template>
    <div id="shopstock">
        <h2>欢迎您 <span>邓小三</span></h2>
        <p>
            查看和管理商品库存
        </p>
        <el-card class="box-card">
            <div slot="header">
                <span>库存管理</span>
            </div>
            <el-form :model="shopList" status-icon :rules="rules" ref="shopForm" label-width="100px"
                     class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-form-item label="所属分类" prop="shoplist">
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
                                <el-input v-model="shopList.barCode"></el-input>
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
                            prop="barCode" v-model.number="shopList.barCode">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="shopName" v-model.trim="shopList.shopName">
                    </el-table-column>
                    <el-table-column
                            label="进价（元）"
                            prop="price" v-model.number="shopList.price">
                    </el-table-column>
                    <el-table-column
                            label="入库"
                            prop="shopStorage" v-model.number="shopList.shopStorage">
                    </el-table-column>
                    <el-table-column
                            label="库存"
                            prop="inventory" v-model.number="shopList.inventory">
                    </el-table-column>
                    <el-table-column
                            label="已售"
                            prop="soldout" v-model.number="shopList.soldout">
                    </el-table-column>
                    <el-table-column
                            align="right" label="管理操作">
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
        </el-card>
    </div>
</template>

<script>
    //直接解构api接口对象中的需要的api方法
    import { shopStock } from "@/api/apis.js";
    export default {
        data() { //必须是一个函数
            //再返回前可以做一些特有的运算
            //将来在复用时，返回的字面量是新创建的，相互之间不会产生影响
            return {
                shopList: {
                    barCode: '',
                    num:'',
                    price:'',
                    shopName: '',
                    shoplist: '',
                    shopStorage: '',
                    inventory: '',
                    soldout: '',

                },
                rules:{},
                tableData: [{
                    barCode: '1346549',
                    shopName: '海飞丝去屑洗发水',
                    shoplist: '牙刷',
                    purchasingPrice: '20.00',
                    shopStorage: '8',
                    inventory: '9',
                    soldout: 5,
                },
                ],
                search: ''
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
        ,
            mounted(){
                //发送请求并加载数据
                shopStock()
                    .then((data)=>{
                        //把结果更新到数据对象，由双向绑定完成页面更新
                        this.tableData=data
                    })
            }

    }
</script>

<style lang="less" scoped> //scoped开启范围控制，避免全局污染
#shopstock {
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