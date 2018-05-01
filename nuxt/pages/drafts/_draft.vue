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
      <fs-toolbar-draft :draft="draft" />
      <div class="fs-content elevation-1">
      <v-tabs v-model="active1" color="primary" dark centered>
        <v-tab href="#draft">{{ $t('draft') }}</v-tab>
        <v-tab href="#compare">{{ $t('compare') }}</v-tab>
        <v-tab href='#notes'>{{ $t('notes') }}</v-tab>
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
        <v-tab-item id="notes" v-html="$fs.md.render(draft.notes)" class="fs-pad">
        </v-tab-item>
      </v-tabs>
      <v-tabs v-model="active2" color="primary" dark centered>
        <v-tab href="#info">{{ $t('info') }}</v-tab>
        <v-tab href="#model">{{ $t('model') }}</v-tab>
        <v-tab href='#draft-options'>{{ $t('draftOptions') }}</v-tab>
        <v-tab href='#pattern-options'>{{ $t('patternOptions') }}</v-tab>
        <v-tab-item id="info" class="fs-pad"><fs-table-draft-info :draft="draft" /></v-tab-item>
        <v-tab-item id="model" class="fs-pad"><fs-table-model-info :draft="draft" /></v-tab-item>
        <v-tab-item id="draft-options" class="fs-pad"><fs-table-draft-options :draft="draft" /></v-tab-item>
        <v-tab-item id="pattern-options" class="fs-pad"><fs-table-pattern-options :draft="draft" /></v-tab-item>
      </v-tabs>
      </div>
      <blockquote class="error fs-m800 mt-5" v-if="deleteDraft">
      <h3>Are you certain you want to delete draft {{ draft.handle }}?</h3>
      <h5>{{ $t('thisActionCannotBeUndone') }}</h5>
      <p class="text-xs-right mt-3">
        <v-btn color="white" class="ml-3" @click="trashDraft()"><v-icon class="mr-3">delete</v-icon>{{ $t('deleteThisDraft') }}</v-btn>
        <v-btn color="white" outline class="ml-3" @click="deleteDraft=false"><v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}</v-btn>
      </p>
      </blockquote>
      <p class="text-xs-center mt-5" v-else>
        <v-btn color="error" class="ml-3" @click="deleteDraft=true"><v-icon class="mr-3">delete</v-icon>{{ $t('deleteThisDraft') }}</v-btn>
      </p>
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
import FsTableDraftInfo from '~/components/stateless/FsTableDraftInfo'
import FsTableModelInfo from '~/components/stateless/FsTableModelInfo'
import FsTablePatternOptions from '~/components/stateless/FsTablePatternOptions'
import FsTableDraftOptions from '~/components/stateless/FsTableDraftOptions'
import FsToolbarDraft from '~/components/stateful/FsToolbarDraft'
import FsPageNotFound from '~/components/stateless/FsPageNotFound'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsTableDraftInfo,
    FsTableModelInfo,
    FsTablePatternOptions,
    FsTableDraftOptions,
    FsToolbarDraft,
    FsPageNotFound
  },
  data () {
    return {
      crumbs: [ {to: this.$fs.path('/drafts'), title: this.$t('drafts')}],
      active1: 0,
      active2: 0,
      updateTitle: false,
      deleteDraft: false,
      error: false
    }
  },
  methods: {
    saveTitle() {
      this.$fs.updateDraft(this.draft.handle, {name: this.draft.name})
      .then((result) => { this.updateTitle = false })
    },
    trashDraft() {
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
      console.log(data)
      return data
    })
    .catch((error) => {
      if(error.reason === 'no_such_draft') {
        return {notFound: true}
      } else {
        return {error: true}
      }
    })
  }
}
</script>
