<template>
    <div class="project">
        <div class="projectTitle">
            <div class="selectDiv">
                <div v-for="(v,i) in selectText" :key="i" :class="[i==selectIndex ? 'selectItem selected' : 'selectItem']" @click="changeNavigation(i)">
                    <span>{{v}}</span>
                    <i class="icon iconfont icon-xiajiantou"></i>
                </div>
            </div>
        </div>
        <div class="ulDiv" >
            <ul class="projectUl"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="isMoreLoading"
                :infinite-scroll-immediate-check="true"
                infinite-scroll-distance="10">
                <li class="projectLi" v-for="(v,i) in list" :key="i" @click="toProjectDetail">
                    <div class="liDes">
                        <p class="title">{{v.contract_name}}</p>
                        <p class="titleDes">描述信息</p>
                    </div>
                    <i class="icon iconfont icon-jiantou"></i>
                </li>
            </ul>
            <!--显示加载中转菊花-->
            <div class="loading-box tc" v-if="isLoading">
                <mt-spinner type="snake" class="loading-more"></mt-spinner>
                <span class="loading-more-txt">加载中...</span>
            </div>

            <div class="no-more" v-if="noMore">没有更多了~</div>
        </div>
        <LinkTab></LinkTab>
    </div>
</template>

<script>
    import LinkTab from '@/components/LinkTab.vue'
    import Vue from 'vue'
    import { Spinner, InfiniteScroll, Toast } from 'mint-ui'
    Vue.use(InfiniteScroll)
    Vue.component(Spinner.name, Spinner)

    export default {
        name: 'Project',
        data () {
            return {
                selectText: ['待施工', '施工中', '已完工'],
                selectIndex: 0, // 默认施工中
                list: [],
                isLoading: false, // 加载中转菊花
                isMoreLoading: true, // 加载更多中
                noMore: false, // 是否还有更多
                pageInfo: { // 分页信息
                    page: 1,
                    page_size: 15,
                    total: 0, // 总条数
                    totalPage: 1 // 总分页数
                }
            }
        },
        created () {
        },
        mounted () {
            this.getProjectInfo()
        },
        components: {
            LinkTab
        },
        methods: {
            toProjectDetail () {
                this.$router.push({ path: '/gj_ProjectDetail' }) // 跳转项目详情页
            },
            changeNavigation (index) { // 切换标签页
                this.isMoreLoading = true
                this.selectIndex = index
                this.pageInfo.page = 1 // 初始化
                this.pageInfo.totalPage = 1
                this.list = []
                this.noMore = false
                this.getProjectInfo()
            },
            getProjectInfo (type) { // 获取项目列表
                let _this = this
                this.isLoading = true
                this.$http.get('/api/steward/projects', {
                    params: {
                        status: _this.selectIndex,
                        current_page: _this.pageInfo.page,
                        per_page: _this.pageInfo.page_size
                    }
                }).then((res) => {
                    let datas = res.data
                    if (datas.code === 0) {
                        if (type === 'loadMore') {
                            this.list = this.list.concat(datas.data.data)
                        } else {
                            this.list = datas.data.data
                        }
                        // 设置分页
                        this.pageInfo.total = datas.data.total
                        this.pageInfo.totalPage = Math.ceil(this.pageInfo.total / this.pageInfo.page_size)
                        console.log('总页数', Math.ceil(this.pageInfo.total / this.pageInfo.page_size))
                    } else {
                        Toast({
                            message: datas.msg,
                            duration: 2000
                        })
                    }
                    this.isLoading = false
                    this.isMoreLoading = false
                })
            },
            loadMore () { // 加载更多
                this.pageInfo.page += 1 // 增加分页
                this.isMoreLoading = true // 设置加载更多中
                this.isLoading = true // 加载中
                console.log(this.pageInfo.page, this.pageInfo.totalPage)
                if (this.pageInfo.page > this.pageInfo.totalPage) { // 超过了分页
                    this.noMore = true // 显示没有更多了
                    this.isLoading = false // 关闭加载中
                    return false
                }
                // 做个缓冲
                setTimeout(() => {
                    this.getProjectInfo('loadMore')
                }, 100)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import (reference) "~less/base.less";
    .project{
    .projectTitle{
        position: fixed;
        top: 0;
        width: 100%;
        height: 1.34rem;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
    .selectDiv{
        width: 100%;
        height: 1.34rem;
        display: flex;
        align-items: center;
        justify-content: center;
    .selectItem{
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-sizing: border-box;
    &:nth-child(1){
         width: 30%;
         border-right: 1px solid #dddddd;
     }
    &:nth-child(2){
         width: 40%;
         border-right: 1px solid #dddddd;
     }
    &:nth-child(3){
         width: 30%
     }
    .iconfont {
        margin-top: 0.2rem;
        font-size: 0.3rem;
    }
    }
    .selected{
        color:#c6af6c;
    }
    }
    }
    .ulDiv{
        padding: 1.34rem 0 0.94rem 0;
    .projectUl{
        padding: 0 0 0 0.4rem;
    .projectLi{
        height: 1.28rem;
        line-height: 0.64rem;
        padding-right: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    &:not(:last-child){
         border-bottom: 0.01rem solid #dddddd;
     }
    .liDes{
        width: 90%;
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .title{
        color:#000000;
        line-height: 0.4rem;
        font-size: 0.28rem;
    }
    .titleDes{
        color:#999999;
        line-height: 0.4rem;
        font-size: 0.28rem;
    }
    }
    .iconfont {
        font-size: 0.18rem;
        color:#999999;
    }
    }
    }
    // 加载中。。。
       .loading-box{
           padding:.1rem 0;

    .loading-more{
        display:inline-block;
        vertical-align: middle;
        margin-right:.2rem;
    }
    .loading-more-txt{
        vertical-align: middle;
        font-size:.22rem;
    }
    }

    .no-more{
        color:@c-999;
        font-size:.16rem;
        padding:.1rem 0 .2rem;
    .tc;
    }
    }
    }

</style>