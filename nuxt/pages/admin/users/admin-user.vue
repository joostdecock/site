<template>
  <fs-wrapper-admin-required :callback="loadUser">
    <fs-breadcrumbs :crumbs="crumbs">@{{ (user) ? user.account.username : '...'}}</fs-breadcrumbs>
    <h1 class="text-xs-center">@{{ (user) ? user.account.username : 'Loading...'}}</h1>
    <div class="fs-content elevation-1 mt-5">
    <v-tabs v-model="active" color="primary" dark centered>
      <v-tab href="#badges">badges</v-tab>
      <!--
      <v-tab href='#patron'>{{ $t('patron') }}</v-tab>
      <v-tab href='#role'>{{ $t('role') }}</v-tab>
      -->
      <v-tab-item id="badges" class="fs-pad">
        <v-layout v-if="user">
          <v-flex xs6 class="text-xs-center">
            <h3>Assigned</h3>
            <a :title="'Revoke the '+badge+' badge'" href="#" v-for="(t, badge) in user.account.data.badges" :key="badge" @click="removeBadge(badge)">
              <img class="badge" :src="'/img/badges/badge-'+badge+'.svg'" />
            </a>
        </v-flex>
          <v-flex xs6 class="text-xs-center">
            <h3>Available</h3>
            <a :title="'Assign the '+badge+' badge'" href="#" v-for="badge in $fs.conf.badges" :key="badge" v-if="user.account.data.badges[badge] !== true" @click="addBadge(badge)">
              <img class="badge" :src="'/img/badges/badge-'+badge+'.svg'" />
            </a>
        </v-flex>
        </v-layout>
      </v-tab-item>
      <!--
      <v-tab-item id="patron" class="fs-pad">
      patron
      </v-tab-item>
      <v-tab-item id="role" class="fs-pad">
        role
      </v-tab-item>
      -->
    </v-tabs>
    </div>
  </fs-wrapper-admin-required>
</template>

<script>
import FsWrapperAdminRequired from '~/components/stateless/FsWrapperAdminRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
export default {
  components: {
    FsWrapperAdminRequired,
    FsBreadcrumbs,
  },
  layout: 'wide',
  data: function() {
    return {
      crumbs: [
        {to: this.$fs.path('/admin'), title: 'Administration'},
        {to: this.$fs.path('/admin/users'), title: 'Users'},
      ],
      error: false,
      loading: true,
      active: 0,
      user: false
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
    loadUser() {
      this.$fs.adminLoadUser(this.$route.params.user)
      .then((data) => {
        this.user = data
        this.loaded = true
      })
      .catch((error) => {
        console.log('Loading user failed')
        console.log(error)
        return {error: true}
      })
    },
    removeBadge(badge) {
      this.$fs.adminRemoveBadge(badge, this.$route.params.user)
      .then((data) => {
        this.user.account.data.badges = data.badges
      })
      .catch((error) => {
        console.log('Removing badge failed')
        console.log(error)
        return {error: true}
      })
    },
    addBadge(badge) {
      this.$fs.adminAddBadge(badge, this.$route.params.user)
      .then((data) => {
        this.user.account.data.badges = data.badges
      })
      .catch((error) => {
        console.log('Removing badge failed')
        console.log(error)
        return {error: true}
      })
    }
  }
}
</script>

<style>

img.badge {
  width: 50px;
  height: 50px;
  padding: 4px;
  border-radius: 50%;
}
</style>
