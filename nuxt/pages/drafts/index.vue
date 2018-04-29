<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('drafts') }}</fs-breadcrumbs>
    <h1 class="mb-5 text-xs-center">{{ $t('drafts') }}</h1>
    <fs-table-drafts :items="loadDrafts()" />
    <blockquote class="warning text-xs-left" v-if="$store.state.selected.drafts.length > 0">
      <h3>fixme</h3>
    </blockquote>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsTableDrafts from '~/components/stateless/FsTableDrafts'
export default {
	layout: 'wide',
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
    FsTableDrafts
  },
  data: function() {
    return {
      error: false,
      loading: true
    }
  },
  methods: {
    loadDrafts: function() {
      const drafts = []
      for(let id in this.$store.state.user.drafts) {
        let draft = JSON.parse(JSON.stringify(this.$store.state.user.drafts[id]))
        draft.model = draft.data.options.model
        if(typeof this.$fs.conf.mapping.patternToHandle[draft.pattern] === 'string') {
          draft.pattern = this.$fs.conf.mapping.patternToHandle[draft.pattern]
        }
        drafts.push(draft)
      }
      return drafts
    }
  }
}
</script>
