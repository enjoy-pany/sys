<template>
  <div>
    <h2>Hello, this is anchor review</h2>
    <Anchor></Anchor>
  </div>
</template>

<script>
import Anchor from '../components/Anchor'
export default {
  name: 'anchor',
  data () {
    return {}
  },
  components: {
    Anchor
  }
}

</script>

<style lang="less" scoped>
  h2 {
    text-align: center;
  }
</style>
