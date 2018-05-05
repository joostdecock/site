<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('model') }} {{ $route.params.model }}</fs-breadcrumbs>
    <div v-if="model">
      <h1>{{ model.name }}</h1>
      <div class="fs-content elevation-1 mt-5">
      <v-tabs v-model="active" color="primary" dark centered>
        <v-tab href="#measurements">{{ $t('measurements') }}</v-tab>
        <v-tab href='#image'>{{ $t('image') }}</v-tab>
        <v-tab href='#settings'>{{ $t('settings') }}</v-tab>
        <v-tab-item id="measurements" class="fs-pad">
          <fs-table-measurements-settings :model="model" @updated="refreshModel()" />
        </v-tab-item>
        <v-tab-item id="image" class="fs-pad">
          <fs-avatar-uploader type="model" :model="model" />
        </v-tab-item>
        <v-tab-item id="settings" class="fs-pad">
          <fs-table-model-settings :model="model" @updated="refreshModel()" />
        </v-tab-item>
      </v-tabs>
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
import FsPageNotFound from '~/components/stateless/FsPageNotFound'
import FsAvatarUploader from '~/components/stateful/FsAvatarUploader'
import FsTableModelSettings from '~/components/stateful/FsTableModelSettings'
import FsTableMeasurementsSettings from '~/components/stateful/FsTableMeasurementsSettings'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsTableModelInfo,
    FsPageNotFound,
    FsAvatarUploader,
    FsTableModelSettings,
    FsTableMeasurementsSettings,
  },
  data () {
    return {
      crumbs: [ {to: this.$fs.path('/models'), title: this.$t('models')}],
      active: 0,
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
    },
    refreshModel() {
      this.model = this.$fs.normalize(this.$store.state.user.models[this.model.handle])
    }
  },
  asyncData: function ({ app, route }) {
    return app.$fs.loadModel(route.params.model)
    .then((data) => {
      console.log(data)
      return data
    })
    .catch((error) => {
      if(error.reason === 'no_such_model') {
        return {notFound: true}
      } else {
        return {error: true}
      }
    })
  }
}
</script>
