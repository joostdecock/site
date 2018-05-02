<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('settings') }}</fs-breadcrumbs>
    <h1>{{ $t('settings') }}</h1>
    <div class="fs-content elevation-1 mt-5">
    <v-tabs v-model="active" color="primary" dark centered>
      <v-tab href="#settings">{{ $t('basics') }}</v-tab>
      <v-tab href='#avatar'>{{ $t('avatar') }}</v-tab>
      <v-tab href='#privacy'>{{ $t('privacy') }}</v-tab>
      <v-tab-item id="settings" class="fs-pad">
        <fs-table-account-settings />
      </v-tab-item>
      <v-tab-item id="avatar" class="fs-pad">
        avatar here
      </v-tab-item>
      <v-tab-item id="privacy" class="fs-pad">
        privacy here
      </v-tab-item>
    </v-tabs>
    </div>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsTableAccountSettings from '~/components/stateful/FsTableAccountSettings'
export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
    FsTableAccountSettings
  },
  data: function() {
    return {
      error: false,
      loading: true,
      active: 0
    }
  },
  methods: {
    bulkDelete: function() {
      this.deleting = true
      this.$fs.bulkDeleteDrafts()
      .then((result) => {
        (result) ? this.deleting = false : this.error = true
      })
      .catch((error) => { this.error = true })
    },
  }
}
</script>
