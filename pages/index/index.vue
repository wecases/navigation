<script setup lang="ts">
import { storeToRefs } from 'pinia'
// 设置
const { wallpaperFilter, scaleSize, inputRadius, inputTransparent, inputSize } = storeToRefs(useSetStore())
// 网站状态管理
const { webisteList, actWebiste, siteNavigation, onlineTools, wallpaperImg } = storeToRefs(useIndexStore())
const { selectWebiste, getWallpaper } = useIndexStore()
getWallpaper()
// set组件
const set = ref()
// addList组件
const addList = ref()
// 是否打开设置
const isOpenSet = ref(false)
// 是否打开搜索网址
const isOpenSearchWebiste = ref(false)
// 搜索内容
const searchContent = ref('')
// 搜索联想内容
const searchAssociationContent = ref([])
// 是否打开联想内容
const isOpenSearchAssociationContent = ref(false)

// 隐藏部分内容(搜索地址、搜索内容等)
const hiddenContent = (): void => {
  isOpenSearchWebiste.value = false
  isOpenSearchAssociationContent.value = false
}

// 搜索
const search = (): void => {
  window.location.href = actWebiste.value.search.replace('%q', searchContent.value)
}

// 网址跳转
const websiteJump = (url: string): void => {
  window.open(url)
}

// 搜索内容联想
const searchContentAssociation = () => {
  if (!searchContent.value) {
    isOpenSearchAssociationContent.value = false
    searchAssociationContent.value = []
    return
  }
  // jsonp发送请求
  $jsonp('https://suggestion.baidu.com/su', {
    wd: searchContent.value,
  })
}

// 选中搜索联想内容
const actSeachAssociationContent = (content: string) => {
  // 更新搜索内容
  searchContent.value = content
  // 搜索
  search()
}

// 切换搜索操作
const selectSearchOperation = (isActInput = false) => {
  // 如果为选中输入框
  if (isActInput) {
    isOpenSearchAssociationContent.value = true
    isOpenSearchWebiste.value = false
  }
  else { // 否则为切换搜索网址
    isOpenSearchWebiste.value = !isOpenSearchWebiste.value
    isOpenSearchAssociationContent.value = false
  }
}

// 挂载后
onMounted(() => {
  // getWallpaper()
  // 搜索联想内容
  // window.baidu.sug = (data) => {
  //   if (data.s.length) {
  //     isOpenSearchAssociationContent.value = true
  //     searchAssociationContent.value = data.s
  //   }
  // }
})
</script>

<template>
  <div class="index realtive" @click="hiddenContent">
    <!-- 背景图 -->
    <div v-if="wallpaperImg" class="bg-container bgImg fixed" :style="{ backgroundImage: wallpaperImg }">
      <!-- 模糊区域 -->
      <div class="filter" :style="{ backdropFilter: `blur(${wallpaperFilter.value}px)` }" />
    </div>
    <!-- 导航上方 -->
    <div class="navTop flex f-x-e">
      <!-- 设置 -->
      <div class="set pointer" @click="set.open()">
        <img src="@/assets/img/set.png" alt="">
      </div>
    </div>
    <!-- 内容容器 -->
    <div class="content-container" :style="{ marginRight: `${isOpenSet ? 388 : 0}PX` }">
      <div
        class="box center" :style="{
          transform: `scale(${scaleSize.value})`,
        }"
      >
        <!-- 搜索框 -->
        <div
          class="searchBox groundGlass center flex f-y-c relative"
          :style="{
            borderRadius: `${30 * (inputRadius.value / 100)}px`,
            backgroundColor: `hsla(0, 0%, 100%, ${1 * (inputTransparent.value / 100)})`,
            width: `${100 * (inputSize.value / 100)}%`,
          }"
        >
          <!-- 用于搜索的目标网站 -->
          <div class="targetWebsite" :class="{ act: isOpenSearchWebiste }">
            <div class="target flex pointer f-y-c" @click.stop="selectSearchOperation()">
              <img :src="actWebiste.icon" alt="">
              <div class="icon" />
            </div>
            <!-- 可选网站列表 -->
            <div class="website_list groundGlass flex f-w">
              <div
                v-for="(item, index) in webisteList" :key="index"
                class="website_list_item pointer flex f-c f-x-c f-y-c" @click="selectWebiste(item)"
              >
                <img :src="item.icon" alt="">
                <div class="text ellipsis">
                  {{ item.name }}
                </div>
              </div>
              <!-- 添加 -->
              <div
                class="website_list_item pointer flex f-c f-x-c f-y-c"
                @click.stop="addList.openOperationBox('webiste')"
              >
                <div class="addIcon">
                  <span>+</span>
                </div>
                <div class="text">
                  添加
                </div>
              </div>
            </div>
          </div>
          <!-- 搜索框 -->
          <div class="input" @click.stop="selectSearchOperation(true)">
            <!-- <a-input
              v-model:value="searchContent" allow-clear :bordered="false" placeholder="请输入搜索内容"
              @press-enter="search"
              @change="searchContentAssociation"
            /> -->
            <!-- 搜索框联想内容 -->
            <div v-if="isOpenSearchAssociationContent" class="association absolute groundGlass">
              <div
                v-for="(item, index) in searchAssociationContent"
                :key="index"
                class="association_item"
                @click="actSeachAssociationContent(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <!-- 站点导航 -->
        <div class="siteNavigation groundGlass block">
          <div class="title">
            站点导航
          </div>
          <div class="list flex f-w">
            <div
              v-for="(nav, index) in siteNavigation" :key="index" class="item pointer flex f-y-c"
              @click="websiteJump(nav.search)"
            >
              <img :src="nav.icon" alt="">
              <div class="text ellipsis">
                {{ nav.name }}
              </div>
            </div>
            <!-- 添加 -->
            <div class="item pointer flex f-y-c" @click.stop="addList.openOperationBox('site')">
              <div class="addIcon">
                <span>+</span>
              </div>
              <div class="text">
                添加站点
              </div>
            </div>
          </div>
        </div>
        <!-- 在线工具 -->
        <div class="onlineTools groundGlass block">
          <div class="title">
            在线工具
          </div>
          <div class="list flex f-w">
            <div
              v-for="(tools, index) in onlineTools" :key="index" class="item pointer t-c"
              @click="websiteJump(tools.search)"
            >
              <div class="img flex f-y-c">
                <img :src="tools.icon" alt="">
              </div>
              <div class="text ellipsis">
                {{ tools.name }}
              </div>
            </div>
            <!-- 添加 -->
            <div class="item pointer t-c" @click.stop="addList.openOperationBox('tools')">
              <div class="img">
                <div class="addIcon">
                  <span>+</span>
                </div>
              </div>
              <div class="text">
                添加工具
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设置 -->
    <!-- <Set ref="set" @open="isOpenSet = true" @close="isOpenSet = false" /> -->
    <!-- 添加列表 -->
    <!-- <AddList ref="addList" /> -->
  </div>
</template>

<style scoped lang="less">
.index {
	background-color: rgba(255, 255, 255, 0.5);

	.bg-container {
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 0;
		opacity: 1;

		// 显示动画
		@keyframes show {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		animation: show 0.4s ease;

		.filter {
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.navTop {
		margin-top: 30px;
		position: relative;
		padding-right: 30px;

		.set {
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
			padding: 2px;

			img {
				width: 30px;
				height: 30px;
			}
		}
	}

	.content-container {
		min-height: 100vh;
		position: relative;
		transition: margin ease 0.38s;
		margin-top: 50px;

		.box {
			width: 15rem;
			transition: scale 0.2s;

			.addIcon {
				border-radius: 50%;
				background-color: #e0e0e0;
				font-size: 30px;
				position: relative;

				span {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -56%);
				}
			}

			.searchBox {
				box-sizing: border-box;
				padding: 10px 20px;
				margin-bottom: 1.5rem;
				z-index: 2;

				.targetWebsite {
					margin-right: 20px;

					&.act {
						.icon {
							transform: rotateZ(-180deg);
						}

						.website_list {
							height: v-bind('searchWebisteListHeight');
						}
					}

					.target {
						img {
							width: 30px;
							height: 30px;
							border-radius: 50%;
						}

						.icon {
							transition: all 0.3s;
							border-top: solid 9px #767575;
							border-right: solid 8px transparent;
							border-left: solid 8px transparent;
							margin-left: 15px;
						}
					}

					.website_list {
						height: 0;
						border-radius: 1rem;
						overflow: hidden;
						transition: height 0.2s;
						z-index: 2;

						.website_list_item {
							width: 12.5%;
							height: 119px;

							img,
							.addIcon {
								width: 40px;
								height: 40px;
								margin-bottom: 20px;
								border-radius: 50%;
							}

							.text {
								font-size: 20px;
							}

						}
					}
				}

				.association,
				.website_list {
					top: 110%;
					position: absolute;
					left: 0;
					right: 0;
					background-color: rgb(255, 255, 255);
				}

				.input {
					width: 100%;

					:deep(.ant-input-affix-wrapper) {
						.ant-input {
							font-size: 20px !important;

							&::placeholder {
								color: #565657;
							}
						}

						svg {
							width: 22px;
							height: 22px;
						}
					}

					.association {
						border-radius: 0.2rem;
						overflow: hidden;

						.association_item {
							font-size: 18px;
							padding: 10px 30px;

							&:hover {
								background-color: rgba(0, 0, 0, 0.2);
							}
						}
					}
				}

			}

			.block {
				padding: 0.4rem;
				border-radius: 16px;

				&:not(:last-child) {
					margin-bottom: 0.7rem;
				}

				.title {
					font-size: 18px;
					font-weight: 600;
					margin-bottom: 15px;
				}

				.item {
					.text {
						color: #771caa;
						font-size: 16px;
					}
				}

				&.siteNavigation {
					.list {
						.item {
							width: 31%;
							box-shadow: 4px 4px 8px 0px rgba(1, 1, 2, 0.13);
							padding: 12px;
							background-color: #f5f5f5;
							border-radius: 16px;
							margin-bottom: 12px;

							&:not(:nth-child(3n + 3)) {
								margin-right: 3.5%;
							}

							img,
							.addIcon {
								border-radius: 50%;
								width: 30px;
								height: 30px;
								margin-right: 10px;
							}
						}
					}
				}

				&.onlineTools {
					.list {
						.item {
							width: 20%;
							margin-bottom: 20px;
							padding: 10px;
							border-radius: 11px;

							&:hover {
								background-color: #f2f3ff;
							}

							.img {
								background-color: #fff;
								padding: 6px;
								border-radius: 15px;
								width: 65%;
								margin: 0 auto 5px;

								img {
									width: 100%;
								}

								.addIcon {
									width: 100%;
									height: 1.24rem;
								}
							}
						}
					}
				}
			}
		}

		.boli {
			margin-top: 20px;
			width: 30vw;
			height: 30vh;
			border-radius: 10px;
		}
	}
}
</style>

<style>
body {
	color: #161e2e;
}

/*每个页面公共css */
/* flex */
.flex {
	display: flex;
}

/* flex水平居中 */
.f-x-c {
	justify-content: center;
}

/* flex水平开头 */
.f-x-s {
	justify-content: flex-start;
}

/* flex水平末尾 */
.f-x-e {
	justify-content: flex-end;
}

/* flex自动沾满两端 */
.f-x-b {
	justify-content: space-between;
}

/* flex水平均分 */
.f-x-around {
	justify-content: space-around;
}

/* flex垂直居中 */
.f-y-c {
	align-items: center;
}

/* flex垂直开头 */
.f-y-s {
	align-items: flex-start;
}

/* flex垂直末尾 */
.f-y-e {
	align-items: flex-end;
}

/* flex水平排列 */
.f-r {
	flex-direction: row;
}

/* flex垂直排列 */
.f-c {
	flex-direction: column;
}

/* flex反转水平排列 */
.f-r-r {
	flex-direction: row-reverse;
}

/* flex反转垂直排列 */
.f-c-r {
	flex-direction: column-reverse;
}

/* flex换行 */
.f-w {
	flex-wrap: wrap;
}

/* 文字居中 */
.t-c {
	text-align: center;
}

/* 文字居左 */
.t-l {
	text-align: left;
}

/* 文字居右 */
.t-r {
	text-align: right;
}

/* 文字换行 */
.t-w {
	/* 不识别单词一行显示不下默认换行 */
	word-break: break-all;
	/* 识别单词 不会造成单词断开换行 */
	word-wrap: break-word;
}

/* 背景图尺寸100% */
.b-s-100 {
	background-size: 100% 100%;
}

/* 背景图尺寸自适应 */
.b-s-c {
	background-size: cover;
}

/* 绝对定位 */
.absolute {
	position: absolute;
}

/* 相对定位 */
.relative {
	position: relative;
}

/* 固定定位 */
.fixed {
	position: fixed;
}

/* 外边距居中 */
.center {
	margin: 0 auto;
}

/* 背景图常见样式 */
.bgImg {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
}

.BgImg {
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-position: center;
}

/* 单行文本溢出省略 */
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 多行文本溢出隐藏 */
.linesEllipsis {
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

/* 滚动条隐藏 */
.noScroll::-webkit-scrollbar {
	display: none;
}

/* 盒模型 */
.borderBox {
	box-sizing: border-box;
}

/* 毛玻璃样式 */
.groundGlass {
	background-color: hsla(0, 0%, 100%, 0.5);
	/* backdrop-filter: blur(v-bind('groundGlass.str')); */
}

/* 小手 */
.pointer {
	cursor: pointer;
}
</style>
