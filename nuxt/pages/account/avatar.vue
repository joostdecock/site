<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('avatar') }}</fs-breadcrumbs>
    <h1>{{ $t('settings') }}: {{ $t('avatar')}}</h1>
    <div class="fs-content elevation-1 mt-5">
      <fs-avatar-uploader type="user" />
    </div>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsAvatarUploader from '~/components/stateful/FsAvatarUploader'
export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
    FsAvatarUploader
  },
  layout: 'wide',
  data: function() {
    return {
      crumbs: [ {to: this.$fs.path('/account'), title: this.$t('settings')}]
    }
  },
}
</script>
