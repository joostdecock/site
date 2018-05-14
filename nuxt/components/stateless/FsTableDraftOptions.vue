<template>
  <table class="table fs-info-table">
    <tbody>
      <tr>
        <th class="fs-wp50">{{ $t('seamAllowance') }}</th>
        <td v-html="formatSa()">
        </td>
      </tr>
      <tr>
        <th class="fs-wp50">{{ $t('scope') }}</th>
        <td v-html="formatScope()"></td>
      </tr>
      <tr>
        <th class="fs-wp50">{{ $t('layout') }}</th>
        <td>{{ options.theme }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'FsTableDraftOptions',
  props: {
    draft: {
      type: Object,
      required: true
    }
  },
  data: function() {
    if(typeof this.draft.data.gist === 'undefined') {
      // Drafted prior to site v2
      return {options: this.draft.data.options}
    } else {
      return {options: this.draft.data.gist.draftOptions}
    }
  },
  methods: {
    formatSa: function () {
      if(this.options.sa.type === 'imperial') {
        return this.$t('txt-saOption-imperial')+' (5/8")'
      }
      else if(this.options.sa.type === 'metric') {
        return this.$t('txt-saOption-metric')+' (1cm)'
      }
      else if (typeof this.options.sa !== 'object') {
        // Pre v2 draft
        return this.options.sa
      }
      else if (typeof this.options.sa === 'object') {
        // v2 draft
        return 'fixme'
      }
      else return 'fixme'
    },
    formatScope: function () {
      if(this.options.scope.type === 'pattern') {
        return this.$t('completePattern')
      }
      else if (typeof this.options.scope !== 'object') {
        // Pre v2 draft
        return this.options.scope
      }
      else return 'fixme'
    }
  }
}
</script>
