<template>
  <pre class="fs-pad" v-html="log">
  </pre>
</template>

<script>
export default {
  name: 'FsDraftTicker',
  props: {
    ready: {
      type: Boolean,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      log: '<span class="fs-success">skully@ship</span>:<span class="fs-info">/home/skully</span>$ tail -f /var/log/captains.log',
      preticks: {
         100: '<span class="fs-emoji">🏃</span>'+this.$t('newTaskForUser', {user: '<span class="fs-info">@'+this.$store.state.user.account.username+'</span>'}),
         200: '<span class="fs-emoji">👕</span>'+this.$t('patternIsPattern', {pattern: '<span class="fs-success">'+this.$fs.ucfirst(this.$route.params.pattern+'</span>')}),
         300: '<span class="fs-emoji">💃🏽</span>'+this.$t('modelIsModel', {model: '<span class="fs-success">'+this.$store.state.user.models[this.$route.params.model].name+'</span>'}),
         400: '<span class="fs-emoji">⚡</span>'+this.$t('connectingToSomeApi', {api: 'data'}),
         700: '<span class="fs-emoji">👷</span><span class="fs-warning">[data]</span> '+this.$t('processingDraftOptions'),
         800: '<span class="fs-emoji">🏋️</span><span class="fs-warning">[data]</span> '+this.$t('loadingModelData'),
         900: '<span class="fs-emoji">⚡</span><span class="fs-warning">[data]</span> '+this.$t('connectingToSomeApi', {api: 'core'}),
        1200: '<span class="fs-emoji">📐</span><span class="fs-accent">[core]</span> '+this.$t('draftingPattern', {pattern: this.$route.params.pattern})
      }
    }
  },
  mounted: async function() {
    const self = this
    for(let key in this.preticks) {
      window.setTimeout(function(){
        if(!self.error && !self.ready) self.log += "\n"+self.preticks[key]
      }, key)
    }
    window.setTimeout(function(){
      let i = 0;
      self.log += " "
      let progress = setInterval(function() {
        i++;
        if (self.ready) {
          self.log += "\n"+'<span class="fs-emoji">📦</span> <span class="fs-warning">[data]</span> ' + self.$t('retrievingDraftFromCore') +
            "\n"+'<span class="fs-emoji">💾</span> <span class="fs-warning">[data]</span> ' + self.$('storingDraftData') +
            "\n"+'<span class="fs-emoji">🎉</span> ' + self.$t('taskCompleted') +
            "\n"+'<span class="fs-emoji">😘</span>'+  self.$t('loadingResult')
            clearInterval(progress)
        } else if (self.error) {
          self.log += "\n"+'<span class="fs-emoji">❗</span>' + '<span class="error">' +
          self.$t('ohNo') + '</span> ' + self.$t('somethingWentWrong')
          clearInterval(progress)
        } else {
          self.log += "."
        }
        if (i > 60) {
          clearInterval(progress)
          self.log += "\n"+'<span class="fs-emoji">🤔</span>' + '<span class="error">' +
          self.$t('ohNo') + '</span> ' + self.$t('thisIsTakingLongerThanExpected')
          clearInterval(progress)
        }
      }, 125);
    }, 1500)
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
