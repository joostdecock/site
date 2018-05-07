<template>
  <table class="table fs-info-table">
    <thead>
      <tr>
        <th class="fs-titlerow" colspan="2">
          {{ $t('draftPatternForModel', {pattern: $fs.ucfirst($fs.patternHandle(draft.pattern)), model: draft.model.name}) }}
        </th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <th class="fs-wp50">{{ $t('name') }}</th>
      <td>{{ draft.name }}</td>
    </tr>
    <tr>
      <th>{{ $t('pattern') }}</th>
      <td>
        <nuxt-link :to="$fs.path('/patterns/'+$fs.patternHandle(draft.pattern))">
          {{ $fs.ucfirst($fs.patternHandle(draft.pattern)) }}
        </nuxt-link>
      </td>
    </tr>
    <tr>
      <th>{{ $t('user') }}</th>
      <td>
        <nuxt-link :to="$fs.userPath(draft.userName)">
          @{{ draft.userName }}
        </nuxt-link>
      </td>
    </tr>
    <tr>
      <th>{{ $t('reference') }}</th>
      <td>
        <nuxt-link :to="$fs.draftPath(draft.handle)">
          #{{ draft.handle }}
        </nuxt-link>
      </td>
    </tr>
    <tr>
      <th>{{ $t('created') }}</th>
      <td>{{ $fs.daysAgo(draft.created) }}</td>
    </tr>
    <tr>
      <th>{{ $t('shared') }}</th>
      <td><fs-toggle-shared-draft :shared="(parseInt(draft.shared)) ? true : false" :draft="draft.handle"/></td>
    </tr>
    <tr v-if="$store.state.user.isAdmin">
      <th>{{ $t('coreLink') }}</th>
      <td><a :href="draft.data.coreUrl" target="_BLANK">{{ $t('replay') }}</a></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import FsToggleSharedDraft from '~/components/stateful/FsToggleSharedDraft'

export default {
  name: 'FsTableDraftInfo',
  components: {
    FsToggleSharedDraft
  },
  props: {
    draft: {
      type: Object,
      required: true
    }
  }
}
</script>
