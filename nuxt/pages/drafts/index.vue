<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('drafts') }}</fs-breadcrumbs>
    <h1 class="mb-5 text-xs-center">{{ $t('drafts') }}</h1>
    <fs-table-drafts :items="loadDrafts()" ref="draftsTable" />
    <div class="text-xs-left mt-5" v-if="$store.state.selected.drafts.length > 0">
      <v-btn color="primary" @click="bulkUpgrade()" :disabled="(upgrading || deleting)">
        <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="upgrading"></v-progress-circular>
        <v-icon class="mr-3" v-else>autorenew</v-icon>{{ $t('upgrade') }}
      </v-btn>
      <v-btn color="error" @click="bulkDelete()" :disabled="(upgrading || deleting)">
        <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="deleting"></v-progress-circular>
        <v-icon class="mr-3" v-else>delete</v-icon>
        {{ $t('delete') }}
      </v-btn>
    </div>
    <p class="text-xs-right mt-3">
      <v-btn color="primary" :to="$fs.path('/draft')">
        <v-icon class="mr-3">insert_drive_file</v-icon>
        {{ $t('newDraft') }}
      </v-btn>
    </p>
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
      loading: true,
      deleting: false,
      upgrading: false,
    }
  },
  methods: {
    bulkDelete: function() {
      this.deleting = true
      this.$fs.bulkDeleteDrafts()
      .then((result) => {
        (result) ? this.deleting = false : this.error = true
        this.$refs.draftsTable.clearSelection()
      })
      .catch((error) => { this.error = true })
    },
    bulkUpgrade: function() {
      this.upgrading = true
      this.$fs.bulkUpgradeDrafts()
      .then((result) => {
        (result) ? this.upgrading = false : this.error = true
        this.$refs.draftsTable.clearSelection()
      })
      .catch((error) => { this.error = true })
    },
    loadDrafts: function() {
      const drafts = []
      for(let id in this.$store.state.user.drafts) {
        let draft = JSON.parse(JSON.stringify(this.$store.state.user.drafts[id]))
        if(typeof draft.data.gist === 'object') {
          // v2 draft
          draft.model = draft.data.gist.model.handle
        } else {
          // v1 draft
          draft.model = draft.data.options.model
        }
        if(typeof this.$fs.conf.mapping.patternToHandle[draft.pattern] === 'string') {
          draft.pattern = this.$fs.conf.mapping.patternToHandle[draft.pattern]
        }
        drafts.push(draft)
      }
      return drafts
    }
  },
  beforeCreate: function () {
    this.$fs.auth()
  }
}
</script>
