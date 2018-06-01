<template>
  <v-chip class="px-2" v-html="formatVersion(version)" :color="color" :text-color="textcolor"></v-chip>
</template>

<script>
export default {
  name: 'FsVersionCore',
  props: {
    version: {
      type: String
    }
  },
  data: function() {
    return {
      color: '',
      textcolor: 'primary'
    }
  },
  methods: {
    formatVersion: function(version) {
      if(version === null) {
        this.color = 'error'
        this.textcolor = 'white'
        return this.$t('unknown')
      } else if(version.substr(0,7) === 'unknown' ) {
        this.color = 'error'
        this.textcolor = 'white'
        return '<1.3'
      } else if (version === this.$fs.conf.versions.core) {
        this.color = 'success'
        this.textcolor = 'white'
        return version
      } else {
        this.color = 'warning'
        return version
      }
    }
  }
}
</script>

