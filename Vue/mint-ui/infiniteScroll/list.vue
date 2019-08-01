<template>
<div class="newslist">
  <div class="lodermore">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" :infinite-scroll-immediate-check="true" infinite-scroll-distance="10">
      <li v-for="(v,i) in newsListData" :key="i">
        <h3 class="title">{{v.title}}
        </h3>
        <div class="piclist">
          <div v-for="(pic,i) in v.list_img_list" :key="i"><img :src="pic" alt=""></div>
          </div>
          <div class="source">
            <div class="s-l">{{v.author}}</div>
            <div class="s-r">{{v.format_show_add_time}}</div>
          </div>
      </li>
    </ul>
  </div>
  <div class="loading" v-if="isLoading">
    <div class="lcing">
      <mt-spinner class="cir" type="fading-circle" :size="30"></mt-spinner> 加载中
    </div>

  </div>
  <div class="loading" v-if="noMore">
    <div class="lcing">已全部加载</div>
  </div>
</div>
</template>

<script>
import {
  getNewsList
} from "@/api/http"
export default {
  data() {
    return {
      newsListData: [],
      pageVal: 1,
      pageSize: "10",
      loading: true, //为true时不会触发加载更多，false可以触发
      noMore: false, // 是否还有更多
      isLoading: false, // 加载中转菊花
    }
  },
  created() {
    this.getnewsList()
  },
  methods: {
    async getnewsList() {
      const data = {
        page: this.pageVal,
        count_per_page: this.pageSize,
      }
      const res = await getNewsList(data)
      let resnewsListLength = res.news_list.length;
      this.isLoading = false;
      if (resnewsListLength == 0 && this.newsListData.length == 0) {
        this.loading = true;
      } else {
        //有数据并且请求到的数据等于pageSize说明数据库还有多余数据
        if (resnewsListLength === parseInt(this.pageSize)) {
          for (var i = 0; i < this.pageSize; i++) {
            this.newsListData.push(res.news_list[i]);
          }
          this.loading = false;
        } else {
          //有数据但是数据库数据已经被请求完，没有其他数据
          this.loading = true;
          this.noMore = true;
          for (var i = 0; i < resnewsListLength; i++) {
            this.newsListData.push(res.news_list[i]);
          }
        };
        //数据正好请求完，由于前面加了resnewsListLength == 0限制，会走当前逻辑
        if (resnewsListLength == 0) {
          this.loading = true;
          this.noMore = true;
        }
      }
    },
    loadMore() {
      this.pageVal++;
      this.loading = true;
      this.isLoading = true;
      this.getnewsList();
    }
  }
}
</script>

<style lang="less" scoped>
.newslist {
  background: #fff;
  padding: 0 30px;
  .newstop{
    height: 66px;
    line-height: 66px;
    border-bottom: 1px solid #ddd;
    ul{
      display: flex;
      li{
        flex: 1;
        font-size: 32px;
        text-align: center;
        height: 66px;
      }
      .act{
        color: #29aae1;
        font-weight: bold;
        position: relative;
        height: 67px;
        border-bottom: 3px solid #29aae1;
      }
    }

  }

  .loading {
    padding: 20px 0;

    .lcing {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;

      .cir {
        margin-right: 8px;
      }
    }

  }

  .lodermore {
    background: #fff;

    li {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .title {
      display: -webkit-box;
      /*将对象作为弹性伸缩盒子模型显示*/
      -webkit-box-orient: vertical;
      /*设置或检索伸缩盒对象的子元素的排列方式*/
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 28px;
      margin-bottom: 15px;
    }

    .piclist {
      display: flex;
      font-size: 0;
      margin-bottom: 20px;

      >div {
        width: 33%;
        margin-right: 8px;

        img {
          height: 150px;
          object-fit: cover;
          
        }
      }

      div:last-child {
        margin-right: 0;
      }
    }

    .source {
      display: flex;

      >div {
        flex: 1;
        font-size: 24px;
        color: #828282;
      }

      .s-r {
        text-align: right;
      }
    }
  }
}
</style>