<template>
  <div>
  <table class="table fs-info-table">
    <tbody>
    <tr><th class="fs-titlerow" colspan="2"><br>{{ $t('data') }}</th></tr>
      <tr>
        <th>{{ $t('username') }}</th>
        <td>{{ $store.state.user.account.username }}</td>
        <td><v-btn flat round outline color="accent" @click="editValue('username')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('email') }}</th>
        <td>{{ $store.state.user.account.email }}</td>
        <td><v-btn flat round outline color="accent" @click="editValue('email')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('password') }}</th>
        <td><span class="fs-muted">[{{$t('notShown')}}]</span></td>
        <td><v-btn flat round outline color="accent" @click="editValue('password')">edit</v-btn></td>
      </tr>
      <tr><th class="fs-titlerow" colspan="2"><br>{{ $t('defaults') }}</th></tr>
      <tr>
        <th>{{ $t('units') }}</th>
        <td>{{ $store.state.user.account.units }}</td>
        <td><v-btn flat round outline color="accent" @click="editValue('units')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('theme') }}</th>
        <td>{{ $store.state.user.account.theme }}</td>
        <td><v-btn flat round outline color="accent" @click="editValue('units')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('language') }}</th>
        <td>{{ $i18n.locale }}</td>
        <td><v-btn flat round outline color="accent" @click="editValue('units')">edit</v-btn></td>
      </tr>
      <tr><th class="fs-titlerow" colspan="2"><br>{{ $t('social') }}</th></tr>
      <tr>
        <th>{{ $t('twitter') }}</th>
        <td v-html="($store.state.user.account.social.twitter || '<span class=fs-muted>['+$t('notSet')+']</span>')"></td>
        <td><v-btn flat round outline color="accent" @click="editValue('twitter')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('instagram') }}</th>
        <td v-html="($store.state.user.account.social.instagram || '<span class=fs-muted>['+$t('notSet')+']</span>')"></td>
        <td><v-btn flat round outline color="accent" @click="editValue('instagram')">edit</v-btn></td>
      </tr>
      <tr>
        <th>{{ $t('github') }}</th>
        <td v-html="($store.state.user.account.social.github || '<span class=fs-muted>['+$t('notSet')+']</span>')"></td>
        <td><v-btn flat round outline color="accent" @click="editValue('github')">edit</v-btn></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: 'FsTableAccountSettings',
}
</script>
