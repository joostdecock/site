<template>
  <div>
    <h1>fixme</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="key">{{ $t('prop') }}</th>
          <th class="val">{{ $t('value') }}</th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td class="key">{{ $t('id') }}</td>
        <td class="val">{{ api.adminid }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('username') }}</td>
        <td class="val">{{ api.username }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('role') }}</td>
        <td class="val">{{ api.role }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('userId') }}</td>
        <td class="val">{{ api.id }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('invite') }}</td>
        <td class="val"><pre>{{ api.invite }}</pre></td>
      </tr>
      <tr>
        <td class="key">{{ $t('notes') }}</td>
        <td class="val">{{ api.notes }}</td>
      </tr>
    </tbody>
    </table>
    <p class="text-xs-right">
    <v-btn color="primary" :to="'/admin/edit/admin/'+api.adminid">
      <v-icon class="mr-3">edit</v-icon> {{ $t('editAdmin') }}
    </v-btn>
    <v-btn :to="'/admin/edit/user/'+api.id">
      <v-icon class="mr-3">edit</v-icon> {{ $t('AdmineditLinkedUser') }}
    </v-btn>
    </p>
  </div>
</template>

<script>
export default  {
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.DATA_API+'/profile')
      .then(function (response) {
        if(response.result === 'ok') {
            return response
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        self.error = true
      })
    }
  }
}
</script>

<style scoped>
  pre {
    letter-spacing: 1px;
  }
  table.table thead th.key {
    text-align: right;
    font-size: 1rem;
  }
  table.table thead th.val {
    text-align: left;
    font-size: 1rem;
  }
  table.table tbody td.key {
    font-weight: bold;
    max-width: 150px;
    text-align: right;
    font-size: 0.8rem;
  }
  table.table tbody td.val {
    font-size: 0.8rem;
  }
</style>
