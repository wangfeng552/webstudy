<template>
  <div class="service-list">
    <div class="blue-tab">
      <ul>
        <li v-for="(v,i) in serviceState" @click="chooseState(i)" :class="{active:v.active}">{{v.state}}</li>
      </ul>
    </div>
    <div class="table-box" v-if="productsDtl">
      <el-table
        :data="productsDtl.products"
        style="width: 100%">
        <el-table-column
          prop="no"
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="service"
          label="服务名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="service_category"
          label="服务分类"

        >
        </el-table-column>
        <el-table-column
          prop="service_fee"
          label="服务费用"
          width="140"
        >
        </el-table-column>
        <el-table-column
          label="提交时间"
          width="160"
        >
          <template scope="scope">
            <span>{{scope.row.updated_at.substring(0,10)}} {{scope.row.updated_at.substring(11,16)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template scope="scope">
            <span v-if="status=='online'">
              <span class="checkDtl" @click="dropProduct(scope.row.id)" :id="scope.row.id">下架</span>
              <!--<span class="checkDtl" @click="editProduct(scope.row.id)">编辑</span>-->
               <router-link :to="{name:'serviceAdd',params:{id:$route.params.id},query: { produceId: scope.row.id,edit:0 }}"><span class="checkDtl">编辑</span></router-link>
              <span class="del cp"  @click="deleteProduct(scope.row.id)" :id="scope.row.id">删除</span>
            </span>
            <span v-if="status=='offline'">
              <span class="checkDtl" @click="postProduct(scope.row.id,scope.row.have_post)" :id="scope.row.id" :prostate="scope.row.have_post">上架</span>
              <!--<span class="checkDtl" @click="editProduct(scope.row.id)">编辑</span>-->
                <router-link :to="{name:'serviceAdd',params:{id:$route.params.id},query: { produceId: scope.row.id,edit:0 }}"><span class="checkDtl">编辑</span></router-link>
              <span class="del cp" @click="deleteProduct(scope.row.id)" :id="scope.row.id">删除</span>
            </span>
            <span v-if="status=='editing'">
              <!--<span class="checkDtl" @click="editProduct(scope.row.id)">编辑</span>-->
              <router-link :to="{name:'serviceAdd',params:{id:$route.params.id},query: { produceId: scope.row.id,edit:1 }}"><span class="checkDtl">编辑</span></router-link>
              <span class="del cp" @click="deleteProduct(scope.row.id)" :id="scope.row.id">删除</span>
            </span>
            <span v-if="status=='past'">
            </span>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="productsDtl.total_count"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'

  export default{
    data(){
      return {
        productsDtl: '',
        currentPage: 1,
        status: 'online',
        serviceState: [
          {
            active: true,
            state: '已上架',
            status: 'online'
          },
          {
            active: false,
            state: '已下架',
            status: 'offline'
          },
          {
            active: false,
            state: '编辑中',
            status: 'editing'
          },
          {
            active: false,
            state: '历史记录',
            status: 'past'
          }
        ],
      }
    },
    computed: {
      ...mapGetters(["type_service_add"]),
    },
    created: function () {
      this.gitId()
    },
    mounted: function () {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.serviceId = to.params.id
        if(from.name != 'serviceAdd') vm.$store.dispatch('get_type_service_add',-100);
      })
    },
    methods: {
      //商品删除
      deleteProduct(id) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(API.url + 'products/' + id)
            .then((res) => {
              this.productsDtl = res.body
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.obtainNum()
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //商品上架
      postProduct(id,prostate){
        if(prostate){
          this.$confirm('上架栏已存在该商品，确定覆盖吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.patch(API.url + 'products/' + id + '/post')
              .then((res) => {
                this.obtainNum()
                this.productsDtl = res.body
                this.$message({
                  type: 'success',
                  message: '上架成功!'
                });
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '上架失败'
            });
          })
        }else{
          this.$confirm('此操作将上架该商品, 是否继续？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.patch(API.url + 'products/' + id + '/post')
              .then((res) => {
                this.obtainNum()
                this.productsDtl = res.body
                this.$message({
                  type: 'success',
                  message: '上架成功!'
                });
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '上架失败'
            });
          })
        }
      },
      //商品下架
      dropProduct(id){
        this.$confirm('此操将下架该商品, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.patch(API.url + 'products/' + id + '/drop')
            .then((res) => {
              this.productsDtl = res.body
              this.$message({
                type: 'success',
                message: '下架成功!'
              });
              this.obtainNum()

            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '下架失败'
          });
        });
      },
      // editProduct  编辑产品
      editProduct(productId){
        //直接跳转页面
        console.log(productId);
        console.log(this.$route.params.id);
//        this.$router.go({name: 'serviceAdd', params: {id:this.$route.params.id},query: { produceId: productId }})
      },
      //切换状态
      chooseState(i){
        this.serviceState.forEach((v) => {
          v.active = false
        })
        this.currentPage = 1
        this.serviceState[i].active = true
        this.status = this.serviceState[i].status
        this.$http.get(API.url + 'products?status=' + this.serviceState[i].status + '&provider_id=' + this.$route.params.id + '&per=10'
        ).then((res) => {
          this.productsDtl = res.body
        })
      },
      gitId(){
        this.$http.get(API.url + 'products?status=online&provider_id=' + this.$route.params.id + '&per=10'
        ).then((res) => {
          this.productsDtl = res.body
          this.status = 'online'
          this.serviceState[0].state = '已上架（' + this.productsDtl.total_count + '）'
          this.serviceState[0].active=true
          if(this.type_service_add >0) this.chooseState(this.type_service_add);
        })
        this.serviceState.forEach((v) => {
          v.active = false
        })
        this.obtainNum()
      },
      //获取商品数量
      obtainNum(){
        this.$http.get(API.url + 'products/statistics?provider_id='+this.$route.params.id
        ).then((res) => {
          this.serviceState[0].state='已上架（' +res.body.online_count+'）'
          this.serviceState[1].state='已下架（' +res.body.offline_count+'）'
          this.serviceState[2].state='编辑中（' +res.body.editing_count+'）'
          this.serviceState[3].state='历史记录（' +res.body.past_count+'）'
        })
      },

      //分页
      handleCurrentChange(val){
        this.$http.get(API.url + 'products?status=' + this.status + '&provider_id=' + this.$route.params.id + '&page=' + val + '&per=10'
        ).then((res) => {
          this.productsDtl = res.body

        })
      }
    },
    watch: {
      '$route': 'gitId',
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .service-list {
    .table-box {
      padding-left: 0;
      padding-right: 0;
    }
    .checkDtl {
      margin-right: 2px;
    }
    .blue-tab {
      padding-left: 0;
    }
    .checkDtl {
      margin-right: 5px;
    }
  }
</style>
