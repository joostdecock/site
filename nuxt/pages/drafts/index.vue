<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('drafts') }}</fs-breadcrumbs>
    <h1 class="mb-5 text-xs-center">{{ $t('drafts') }}</h1>
    <fs-table-drafts :items="loadDrafts()" />
    <div class="text-xs-left mt-5" v-if="$store.state.selected.drafts.length > 0">
      <v-btn color="primary" @click="bulkUpdate()" :disabled="(updating || deleting)">
        <v-progress-circular indeterminate color="#fff" class="mr-3" :size="24" :width="2" v-if="updating"></v-progress-circular>
        <v-icon class="mr-3" v-else>autorenew</v-icon>{{ $t('update') }}
      </v-btn>
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
      updating: false,
    }
  },
  methods: {
    bulkDelete: async function() {
      this.deleting = true
      await this.$fs.bulkDeleteDrafts()
      this.deleting = false
    },
    bulkUpdate: async function() {
      this.updating = true
      this.$fs.bulkUpdateDrafts()
      .then((result) => {
        (result) ? this.updating = false : this.error = true
      })
    },
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
