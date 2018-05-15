<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('draft') }} {{ $route.params.draft }}</fs-breadcrumbs>
    <div v-if="draft">
      <h1 v-if="!updateTitle">{{ draft.name }}
        <v-btn outline round class="ml-3" color="accent" @click="updateTitle=true">{{ $t('edit') }}</v-btn>
      </h1>
      <div v-else class="mb-5 mt-5">
        <v-text-field name="draftTitle" :label="$t('title')" id="draftTitle" v-model="draft.name" box></v-text-field>
        <v-btn @click="saveTitle" color="primary"><v-icon class="mr-3">save</v-icon>Save</v-btn>
      </div>
      <blockquote class="error fs-m800 mt-5" v-if="deleteThisDraft">
      <h3>Are you certain you want to delete draft {{ draft.handle }}?</h3>
      <h5>{{ $t('thisActionCannotBeUndone') }}</h5>
      <p class="text-xs-right mt-3">
        <v-btn color="white" class="ml-3" @click="trashDraft()"><v-icon class="mr-3">delete</v-icon>{{ $t('deleteThisDraft') }}</v-btn>
        <v-btn color="white" outline class="ml-3" @click="$store.commit('setAction', {action: 'deleteDraft', value: false})"><v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}</v-btn>
      </p>
      </blockquote>
      <div v-else>
        <div class="fs-content elevation-1">
          <v-tabs v-model="active1" color="primary" dark centered>
            <v-tab href="#draft">{{ $t('draft') }}</v-tab>
            <v-tab href="#compare">{{ $t('compare') }}</v-tab>
            <v-tab href='#notes'>{{ $t('notes') }}</v-tab>
            <v-tab href='#gist'>{{ $t('gist') }}</v-tab>
            <v-tab-item id="draft" class="fs-pad">
              <a :href="$fs.draftSvgLink(draft.handle, draft.userHandle, draft.cache)">
                <img :src="$fs.draftSvgLink(draft.handle, draft.userHandle, draft.cache)" />
              </a>
            </v-tab-item>
            <v-tab-item id="compare" class="fs-pad">
              <a :href="$fs.draftComparedLink(draft.handle, draft.userHandle, draft.cache)">
                <img :src="$fs.draftComparedLink(draft.handle, draft.userHandle, draft.cache)" />
              </a>
            </v-tab-item>
            <v-tab-item id="notes" v-html="'<div class=\'fs-m800 fs-pad\'>'+$fs.md.render(draft.notes)+'</div>'" class="fs-pad">
            </v-tab-item>
            <v-tab-item id="gist" class="fs-pad">
              <pre v-if="typeof draft.data.gist !== 'undefined'">{{ draft.data.gist }}</pre>
              <blockquote v-else class="warning">
                <h3>{{ $t('thisDraftPredatesThisFeature') }}</h3>
                <p>{{ $t('pleaseUpgradeThisDraft') }}</p>
                <p class="text-xs-right"><v-btn @click="upgradeDraft" class="primary" :disabled="upgrading">
                  <v-progress-circular v-if="upgrading" indeterminate color="white"></v-progress-circular>
                  <v-icon v-else class="mr-3">autorenew</v-icon>
                  {{ $t('upgrade') }}</v-btn></p>
              </blockquote>
            </v-tab-item>
          </v-tabs>
        </div>
        <div class="fs-content elevation-1 mt-5 pt-3">
          <h2 class="text-xs-center">{{$t('model')}}</h2>
          <fs-table-model-info :draft="draft" />
          <h2 class="text-xs-center">{{$t('patternOptions')}}</h2>
          <fs-table-pattern-options :draft="draft" />
          <h2 class="text-xs-center">{{$t('draftOptions')}}</h2>
          <fs-table-draft-options :draft="draft" />
        </div>
      </div>
    </div>
    <fs-page-not-found v-else-if="notFound" />
    <blockquote v-else class="fs-m800 mt-5 mb-5 error">
      <h3>{{ $t('ohNo') }}</h3>
      <h5>{{ $t('somethingWentWrong') }}</h5>
      <p class="text-xs-center"><v-btn class="mt-5" large flat outline color="white"><v-icon class="mr-3">home</v-icon>{{ $t('home') }}</v-btn></p>
    </blockquote>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsTableModelInfo from '~/components/stateless/FsTableModelInfo'
import FsTablePatternOptions from '~/components/stateless/FsTablePatternOptions'
import FsTableDraftOptions from '~/components/stateless/FsTableDraftOptions'
import FsPageNotFound from '~/components/stateless/FsPageNotFound'

export default {
  components: {
    FsBreadcrumbs,
    FsTableModelInfo,
    FsTablePatternOptions,
    FsTableDraftOptions,
    FsPageNotFound
  },
  data () {
    return {
      crumbs: [ {to: this.$fs.path('/drafts'), title: this.$t('drafts')}],
      active1: 0,
      active2: 0,
      updateTitle: false,
      deleteDraft: false,
      error: false,
      upgrading: false
    }
  },
  computed: {
    deleteThisDraft() {
      if(typeof this.$store.state.actions.deleteDraft !== 'undefined') {
        return this.$store.state.actions.deleteDraft
      } else {
        return false
      }
    }
  },
  methods: {
    saveTitle() {
      this.$fs.upgradeDraft(this.draft.handle, {name: this.draft.name})
      .then((result) => { this.updateTitle = false })
    },
    upgradeDraft() {
      this.upgrading = true
      this.$fs.upgradeDraft(this.draft.handle)
      .then((result) => {
        // fixme: This is hackish
        window.location.reload(true)
      })
      .catch((error) => {
        this.error = true
      })
    },
    trashDraft() {
      this.$store.commit('setAction', {action: 'deleteDraft', value: false})
      this.$fs.deleteDraft(this.draft.handle)
      .then((result) => {
        this.$router.push(this.$fs.path('/drafts'))
      })
      .catch((error) => {
        this.error = true
      })
    }
  },
  asyncData: function ({ app, route }) {
    return app.$fs.loadDraft(route.params.draft)
    .then((data) => {
      return data
    })
    .catch((error) => {
      if(error.reason === 'no_such_draft') {
        return {notFound: true}
      } else {
        return {error: true}
      }
    })
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: 'fs-dynamic-aside-draft'
    })
    this.$store.commit('setComponentData', {
      source: 'draft',
      data: this.draft
    })
  },
  beforeDestroy: function() {
    this.$store.commit('setAction', {action: 'deleteDraft', value: false})
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: ''
    })
  }
}
</script>
