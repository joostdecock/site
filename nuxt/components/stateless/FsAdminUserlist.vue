<template>
  <div>
    <div v-for="(user, handle) in users" :key="handle">
      <fs-admin-userlist-entry :user="user" />
    </div>
  </div>
</template>

<script>
import FsAdminUserlistEntry from '~/components/stateless/FsAdminUserlistEntry'
export default {
  name: 'FsAdminUserlist',
  components: {
    FsAdminUserlistEntry
  },
  props: {
    users: {
      type: Object,
      required: true
    }
  }
}
</script>
