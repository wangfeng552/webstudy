<template>
  <div class="screeing">
      <div class="screeing-bg">

      </div>
      
      <div class="screeing-content">
        <div class="title">
          场次选择
        </div>
        <div class="screeing-con">
            <div class="screeing-title">
                <div class="name">
                    名称
                </div>
                <div class="time">
                    时间
                </div>
                <div class="surplus">
                    剩余
                </div>
            </div>
            <div class="screen" :class="{'check': screenings == screen}" v-for="screen in getScreeningList" @click="optScreening(screen)">
                <div class="name">{{screen.showName}}</div>
                <div class="time">{{screen.showBeginTime}} -<br> {{screen.showEndTime}}</div>
                <div class="surplus">{{screen.leftAmount}}</div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: ["screenings", "getScreeningList"],
  data() {
    return {};
  },
  computed: {},

  methods: {
    optScreening(obj) {
      this.$emit("selectScreening",obj);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.screeing {
  .screeing-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
  .screeing-content {
    position: absolute;
    /* width: 100%; */
    top: 0px;
    z-index: 11;
    background: white;
    margin: 0 0.6rem;
    left: 0;
    right: 0;
    text-align: center;
    height: auto;
    max-height: 8rem;
    /* margin: auto 0; */
    top: 50%;
    /* transition: tra; */
    transform: translateY(-50%);
    border-radius: 0.2rem;
    .title {
      font-size: 0.5rem;
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #ebebeb;
    }
    .screeing-con {
      overflow-y: scroll;
      max-height: 6rem;
      padding-bottom: 0.5rem;
      .screen {
        font-size: 0.3rem;
        display: flex;
        border-bottom: 1px solid #ebebeb;
        padding: 0.2rem 0.1rem;
        align-items: center;
        height: 2rem;
        //   line-height: 2rem;
        .name {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
          font-size: 0.3rem;
          max-width: 25%;
          width: 25%;
        }
        .time {
          width: 55%;
        }
        .surplus {
          font-size: 0.3rem;
          max-width: 20%;
          width: 20%;
        }
      }

      .check {
        border: 1px solid #dcbd72;
      }
    }

    .screeing-title {
      display: flex;
      border-bottom: 1px solid #ebebeb;
      padding: 0.1rem 0;
      .name {
        width: 25%;
        font-size: 0.3rem;
      }
      .time {
        width: 55%;
        font-size: 0.3rem;
      }
      .surplus {
        font-size: 0.3rem;
        max-width: 20%;
        width: 20%;
      }
    }

    // .screen:last-child {
    //   border-bottom: 0px !important;
    // }
  }
}
</style>

