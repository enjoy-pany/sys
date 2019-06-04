<template>
  <div class="code">
    <pre>
        <code>
            <slot></slot>
        </code>
    </pre>
    <xmp></xmp>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.code {
    width: 100%;
    height: auto;
    background: #333;
    color: #f5f2f0;
    font-size: 16px;
}
</style>
