<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('consent') }}</fs-breadcrumbs>
    <h1>{{ $t('settings') }}: {{ $t('consent')}}</h1>
    <div class="fs-content elevation-1 mt-5">
        <fs-consent-gdpr :intro="(true)" :profile="(true)" :model="(true)" />
    </div>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsConsentGdpr from '~/components/stateless/FsConsentGdpr'
export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
    FsConsentGdpr
  },
  layout: 'wide',
  data: function() {
    return {
      crumbs: [ {to: this.$fs.path('/account'), title: this.$t('settings')}]
    }
  },
}
</script>
