<template>
    <div class="noData">
      <div>
        <p><i class="iconfont icon-zanwushuju" style="font-size: 60px;"></i></p>
        <p style="margin-top: 10px;">暂无数据</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "s3-no-data",
    }
</script>

<style scoped>
  .noData{
    width: 100%;
    padding: 16vh 0;
    text-align: center;
  }
  .noData div{
    color: #b4b4b4;
  }
</style>
