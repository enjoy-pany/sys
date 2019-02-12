<template>
  <div class="mainCon">
    <ul>
      <li v-for="(item, index) in msg " :key="index" @click="tabNav(index)" :class="{active: (nowTab == index)}">导航{{item}}</li>
    </ul>
    <div class="content" @touchmove="navPosition($event)">
      <div class="d_jump">1</div>
      <div class="d_jump">2</div>
      <div class="d_jump">3</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowTab: 0,
      msg: [1, 2, 3]
    };
  },
  methods: {
    tabNav(index) {
      this.nowTab = index;
      this.jump(index);
    },
    navPosition(e) {
      let jump = document.querySelectorAll(".d_jump");
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (distance > jump[2].offsetTop) {
        this.nowTab = 2;
      } else if (distance > jump[1].offsetTop) {
        this.nowTab = 1;
      } else {
        this.nowTab = 0;
      }
    },
    jump(index) {
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll(".d_jump");
      let total = jump[index].offsetTop;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      console.log(distance);
      console.log(document.querySelector(".mainCon").scrollTop);
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mainCon {
  width: 300px;
  height: 500px;
  margin: 0 auto;
  border: 1px #ccc solid;
  ul {
    width: 50px;
    margin: 0;
    padding: 0;
    background: rgba(255, 255, 255, 0.4);
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px #ccc solid;
    flex-direction: column;
    position: fixed;
    top: 30%;
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
    li:nth-of-type(2) {
      border-top: 1px #ccc solid;
      border-bottom: 1px #ccc solid;
    }
    .active {
      background: #000;
      color: #fff;
    }
  }
}
.content {
  width: 100%;
  height: 1500px;
  div {
    width: 100%;
    height: 160px;
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    color: #fff;
  }
  div:nth-of-type(1) {
    background: green;
  }
  div:nth-of-type(2) {
    background: blue;
  }
  div:nth-of-type(3) {
    background: red;
  }
}
</style>
