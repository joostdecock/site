<template>
  <div class="fs-content fs-pad mb-3 elevation-1 fs-m800" style="position: relative">
    <div style="float: right">
      <nuxt-link :to="$fs.path('/admin/users/'+user.username)">
        <span class="fs-block-link"></span>
        <img :src="$fs.conf.apis.data+user.picture" style="max-width: 25%; border-radius: 50%; float: right;" class="elevation-1"/>
      </nuxt-link>
    </div>
    <h2>@{{user.username}}</h2>
    <ul>
      <li v-if="user.patron != '0'"><b>{{ $t('patron-'+user.patron) }}</b></li>
      <li>{{ $t('lastLogin')}}: {{ $fs.daysAgo(user.login) }}</li>
      <li>{{ $t('userHasBeenWithUsSince', {user: user.username, since: $fs.daysAgo(user.created)}) }}</li>
      <li>{{ $t('emailAddress')}}: <a :href="'mailto:'+user.email">{{ user.email }}</a></li>
    </ul>
    <div style="clear: both"></div>
    <fs-badge-list :badges="user.badges" />
  </div>
</template>

<script>
import FsBadgeList from '~/components/stateless/FsBadgeList'
export default {
  name: 'FsAdminUserlistEntry',
  components: {
    FsBadgeList
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
