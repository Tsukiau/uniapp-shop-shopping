<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
	  <view class="search-box">
	     <my-search @click="gotoSearch"></my-search>
	  </view>
		<swiper indicator-dots autoplay :interval="3000" circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item"
				  :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" 
			   :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title" />
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix">
					</navigator>
					<!-- 右侧 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" 
						 :key="index2" v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" class="item2-ipc"
								:style="{width:item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图
				navList: [], // 分类导航
				floorList: [] // 楼层的数据列表
			};
		},
		onLoad() {
			this.getSwiper(),
				this.getNavList(),
				this.getFloorList()
		},
		methods: {
			// 轮播图
			async getSwiper() {
				const { data } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = data.message
			},
			// 分类导航
			async getNavList() {
				const {	data } = await uni.$http.get('/api/public/v1/home/catitems')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.navList = data.message
			},
			// 楼层的数据列表
			async getFloorList() {
				const { data } = await uni.$http.get('/api/public/v1/home/floordata')
				if (data.meta.status !== 200) return uni.$showMsg()
				data.message.forEach(floor => {
					floor.product_list.forEach(item => {
						// 拼接？后面得参数 /pages/goods_list?query=服饰"
						item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				this.floorList = data.message
			},
			// 分类导航项被点击时候的事件处理函数
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 跳转到分包中的搜索页面
			  gotoSearch() {
			     uni.navigateTo({
			         url: '/subpkg/search/search'
			     })
			   }
		},
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

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;

	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.search-box {
	  // 设置定位效果为“吸顶”
	  position: sticky;
	  // 吸顶的“位置”
	  top: 0;
	  // 提高层级，防止被轮播图覆盖
	  z-index: 999;
	}
</style>
