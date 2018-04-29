<template>
  <pre class="fs-pad" v-html="log">
  </pre>
</template>

<script>
export default {
  name: 'FsDraftTicker',
  props: {
    ticks: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      log: '<span class="fs-success">skully@ship</span>:<span class="fs-info">/home/skully</span>$ tail -f /var/log/captains.log'
    }
  },
  mounted: async function() {
    const self = this
    for(let key in this.ticks) {
      await window.setTimeout(function(){
        self.log += "\n"+self.ticks[key]
      }, key)
    }
  }
}
</script>

<style scoped>
pre{
  max-width: 800px;
  margin: auto;
  background: #212121;
  color: #fff;
  border-radius: 6px;
  margin-top: 30px;
  font-family: "Lucida Console", Monaco, monospace;
  line-height: 1.8;
}
</style>
