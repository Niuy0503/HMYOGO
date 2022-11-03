<template>
  <view class="home-container">
    <!-- 组件使用的和原生语法一样 -->
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="item in swiperList" :key="item.goods_id" @click="goGoodsDetail(item.goods_id)">
        <image :src="item.image_src"></image>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="navs">
      <image @click="CatenavigatorTo" v-for="item in navs" :key="item.name" :src="item.image_src"></image>
    </view>
    <!-- 楼层导航 -->
    <view class="floor">
      <!-- 每层的标题 -->
      <view class="floor_item" v-for="item in floors" :key="item.floor_title.name">
        <!-- 图片列表 -->
        <image class="title" :src="item.floor_title.image_src"></image>
        <view class="image_box">
          <!-- 左边的一张图片 -->
          <image @click="goGoodsList(item.product_list[0].navigator_url)" class="left"
            :src="item.product_list[0].image_src">
          </image>
          <!-- 右边的四张图片 -->
          <view class="right">
            <image @click="() => goGoodsList(img.navigator_url)" v-for="img in item.product_list.slice(1)"
              :key="img.image_src" :src="img.image_src">
            </image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<!-- 数据渲染/事件绑定 遵循vue -->
<script>
  import {
    getSwipersAPI,
    getCateNavsAPI,
    getFloorsAPI
  } from '@/api/home.js'
  export default {
    data() {
      return {
        swiperList: [],
        navs: [],
        floors: []
      };
    },
    onLoad() {
      this.getSwipers()
      this.getCateNavs()
      this.getFloors()
    },
    methods: {
      async getSwipers() {
        const data = await getSwipersAPI()
        this.swiperList = data.message
      },
      async getCateNavs() {
        const data = await getCateNavsAPI()
        this.navs = data.message
      },
      async getFloors() {
        const data = await getFloorsAPI()
        this.floors = data.message
      },
      goGoodsList(url) {
        const query = url.split('?')[1]
        console.log(query)
        uni.navigateTo({
          url: "/pages/subGoods/goods_list/goods_list?" + query
        })
      },
      goGoodsDetail(id) {
        uni.navigateTo({
          url: '/pages/subGoods/goods_detail/goods_detail?id=' + id
        })
      },
      CatenavigatorTo() {
        uni.switchTab({
          url: '/pages/cate/cate'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .navs {
    display: flex;
    justify-content: space-around;
    margin: 15rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 楼层
  .floor {
    margin-top: 20rpx;

    .floor_item {
      margin: 15rpx 10rpx;

      .title {
        height: 60rpx;
        width: 750rpx;
      }

      .image_box {
        display: flex;

        .left {
          width: 232rpx;
          height: 392rpx;
        }

        .right {
          width: 500rpx;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-between;

          image {
            width: 233rpx;
            height: 190rpx;
          }
        }
      }
    }
  }
</style>
