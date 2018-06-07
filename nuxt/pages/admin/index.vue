<template>
  <fs-wrapper-admin-required>
    <fs-breadcrumbs>{{ $t('administration') }}</fs-breadcrumbs>
    <h1 class="text-xs-center">Administration</h1>
    <div class="fs-m800 fs-content fs-pad elevation-1 mb-5">
    <v-form class="mt-4" v-on:submit.prevent="findUsers">
      <v-text-field
        :label="$t('usernameOrEmail')"
        v-model="input"
        required
        prepend-icon="perm_identity"
        :autofocus="(true)"
        @keyup.enter="findUsers"
      ></v-text-field>
      <p class="text-xs-center">
        <v-btn @click="findUsers" color="primary" large class="mt-3">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">search</v-icon>
          {{ $t('search') }}
        </v-btn>
      </p>
    </v-form>
    </div>
    <fs-admin-userlist :users="users" />
  </fs-wrapper-admin-required>
</template>

<script>
import FsWrapperAdminRequired from '~/components/stateless/FsWrapperAdminRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsAdminUserlist from '~/components/stateless/FsAdminUserlist'
export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsWrapperAdminRequired,
    FsAdminUserlist
  },
  data: function() {
    return {
      input: '',
      loading: false,
      users: {}
    }
  },
  methods: {
    findUsers: function() {
      this.loading = true;
      this.$fs.adminFindUsers(this.input)
      .then((result) => {
        this.loading = false
        this.users = result.users
      })
      .catch((result) => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>
