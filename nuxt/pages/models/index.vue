<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('models') }}</fs-breadcrumbs>
    <h1 class="mb-5 text-xs-center">{{ $t('models') }}</h1>
    <fs-table-models :items="loadModels()" />
    <p class="text-xs-right mt-3">
      <v-btn color="primary" :to="$fs.path('/model')">
        <v-icon class="mr-3">perm_identity</v-icon>
        {{ $t('newModel') }}
      </v-btn>
    </p>
    <div class="text-xs-left mt-5" v-if="$store.state.selected.models.length > 0">
      <v-btn color="error" @click="bulkDelete()" :disabled="(updating || deleting)">
        <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="deleting"></v-progress-circular>
        <v-icon class="mr-3" v-else>delete</v-icon>
        {{ $t('delete') }}
      </v-btn>
    </div>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsTableModels from '~/components/stateless/FsTableModels'
export default {
	layout: 'wide',
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
    FsTableModels
  },
  data: function() {
    return {
      error: false,
      loading: true,
      deleting: false,
      updating: false,
    }
  },
  methods: {
    bulkDelete: function() {
      this.deleting = true
      this.$fs.bulkDeleteModels()
      .then((result) => {
        this.$store.commit('setSelectedModels', [])
        (result) ? this.deleting = false : this.error = true
      })
      .catch((error) => { this.error = true })
    },
    loadModels: function() {
      const models = []
      for(let id in this.$store.state.user.models) {
        let model = JSON.parse(JSON.stringify(this.$store.state.user.models[id]))
        models.push(model)
      }
      return models
    }
  },
  beforeCreate: function () {
    this.$fs.auth()
  }
}
</script>
