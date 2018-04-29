<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('draft') }} {{ $route.params.draft }}</fs-breadcrumbs>
    <h1>{{ $t('draft') }} {{ $route.params.draft }}</h1>
    <div class="fs-content elevation-1">
    <v-tabs v-model="active" color="primary" dark centered>
      <v-tab href="#draft">{{ $t('draft') }}</v-tab>
      <v-tab href="#compare">{{ $t('compare') }}</v-tab>
      <v-tab href='#notes'>{{ $t('notes') }}</v-tab>
      <v-tab-item id="draft" class="fs-pad">
        <img :src="$fs.draftSvgLink(draft.handle, draft.userHandle)" />
      </v-tab-item>
      <v-tab-item id="compare" class="fs-pad">
        <img :src="$fs.draftComparedLink(draft.handle, draft.userHandle)" />
      </v-tab-item>
      <v-tab-item id="notes" v-html="$fs.md.render(draft.notes)" class="fs-pad">
      </v-tab-item>
    </v-tabs>
    </div>
      <pre>{{ draft }}</pre>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs
  },
  data () {
    return {
      crumbs: [ {to: this.$fs.path('/drafts'), title: this.$t('drafts')}],
      active: 0,
    }
  },
  methods: {
    escape(str) {
      return str.replace(/\\([\s\S])|(")/g,"\\$1$2")
    }
  },
  asyncData: async function ({ app, route }) {
    const { data } = await app.$fs.loadDraft(route.params.draft)
    return data
  },
}
</script>
