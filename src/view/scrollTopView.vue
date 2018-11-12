<template>
  <div class="navMain" v-scroll>
    <div class="navbar" ref="navHeader">
      <li v-for="(item, index) in navMenu" :id="item.id" :key="index" @click="tabNav(index)">
        <p :class="{active: nowTab == index}">{{item.name}}</p>
      </li>
    </div>
    <div class="navCon">
      ttttttttttttt
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      nowTab: 0,
      navMenu: [
        {
          id: 'kcjs',
          name: '课程介绍'
        },
        {
          id: 'szjx',
          name: '师资教学'
        },
        {
          id: 'gmxz',
          name: '购买须知'
        }
      ]

    }
  },
  methods: {
    tabNav(index) {
      this.nowTab = index
    }
  },
  directives: {
    scroll: {
      inserted(el) {
        const _navMain = document.querySelector('.navMain')
        document.onscroll = function(event) {
          const offsetTop = el.offsetTop
          const scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
          const _navbar = document.querySelector('.navbar')
          const _navCon = document.querySelector('.navCon')
          // console.log('offsetTop:' + offsetTop)
          // console.log('scrollTop:' + scrollTop)
          if (scrollTop > offsetTop) {
            _navbar.style.position = 'fixed'
            _navbar.style.left = 0
            _navbar.style.top = 0
          } else {
            _navbar.style.position = 'static'
            _navbar.style.left = 0
            _navbar.style.top = 0
          }
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
.navMain {
  width: 300px;
  height: 500px;
  border: 1px #ccc solid;
  margin: 0 auto;
}
.navbar {
  width: 100%;
  height: 50px;
  border: 2px #eee solid;
  background: #fff;
  border-left: none;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent; //解决点击元素背景闪烁
    p {
      width: auto;
      height: 100%;
      line-height: 50px;
      font-size: 16px;
      color: #999;
    }
    .active {
      color: #ff9c00;
      border-bottom: 1px #ffc700 solid;
    }
  }
}

.navbarActive {
  position: fixed;
  top: 0;
  left: 0;
}

.navCon {
  width: 100%;
  height: 2000px;
  background: #fff;
}
</style>
