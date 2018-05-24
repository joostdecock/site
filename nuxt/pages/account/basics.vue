<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('basics') }}</fs-breadcrumbs>
    <h1>{{ $t('settings') }}: {{ $t('basics')}}</h1>
    <div class="fs-content elevation-1 mt-5">
      <fs-table-account-settings />
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
  layout: 'wide',
  data: function() {
    return {
      crumbs: [ {to: this.$fs.path('/account'), title: this.$t('settings')}]
    }
  },
}
</script>
