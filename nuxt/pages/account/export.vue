<template>
  <fs-wrapper-login-required>
    <blockquote class="">
      <h2>{{ $t('exportMyData') }}</h2>
      <div v-if="queued">
        <p class="text-xs-center">
        {{ $t('txt-dataExportQueued') }}
        </p>
        <v-btn color="primary" @click="exportData()">
          <v-icon class="mr-4 ml-4">home</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <p>{{ $t('txt-dataExport') }}</p>
        <p class="text-xs-center">
        <v-btn color="primary" @click="exportData()">
          <v-icon class="mr-3">archive</v-icon>{{ $t('exportMyData') }}
        </v-btn>
        <v-btn flat outline color="primary" :to="$fs.path('/account')">
          <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
        </v-btn>
        </p>
      </div>
    </blockquote>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
  },
  layout: 'wide',
  data: function() {
    return {
      queued: false,
    }
  },
  methods: {
    exportData: function() {
      this.$fs.exportData()
      .then((result) => {
        this.queued = true
      })
      .catch((error) => { this.error = true })
    },
  }
}
</script>
