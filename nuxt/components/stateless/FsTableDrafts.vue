<template>
  <v-data-table
    :headers="headers"
    :items="items"
    select-all
    class="elevation-1"
    v-model="selected"
    :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
    :rows-per-page-text="$t('rowsPerPage')"
    @input="updateSelectedDrafts()"
  >
    <template slot="items" slot-scope="props">
      <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
      <td>
        <nuxt-link :to="$fs.path('/drafts/'+props.item.handle)">
          {{ props.item.handle }}
        </nuxt-link>
      </td>
      <td class="text-xs-center">
        <nuxt-link :to="$fs.path('/patterns/'+props.item.pattern)">
          {{ $fs.ucfirst(props.item.pattern) }}
        </nuxt-link>
      </td>
      <td class="text-xs-center">
        <nuxt-link :to="$fs.path('/models/'+props.item.model)">
          {{ $store.state.user.models[props.item.model].name }}
        </nuxt-link>
      </td>
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ $fs.daysAgo(props.item.created) }}</td>
      <td class="text-xs-center">
        <fs-version-core :version="props.item.data.version" />
      </td>
    </template>
    <template slot="pageText" slot-scope="props">
      {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
    </template>
    <template slot="no-data">
      <blockquote class="warning fs-m800 mt-5 mb-5">
        <h3>{{ $t('noDraftsFound') }}</h3>
        <v-btn large color="primary">
          <v-icon class="mr-3">insert_drive_file</v-icon>
          {{ $t('newDraft') }}</v-btn>
      </blockquote>
    </template>
  </v-data-table>
</template>

<script>
import FsVersionCore from '~/components/stateless/FsVersionCore'

export default {
  name: 'FsTableDrafts',
  components: {
  FsVersionCore
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: '#', value: 'handle', align: 'center' },
        { text: this.$t('pattern'), value: 'pattern', align: 'center' },
        { text: this.$t('model'), value: 'model', align: 'center' },
        { text: this.$t('name'), value: 'name', align: 'center' },
        { text: this.$t('date'), value: 'created', align: 'center' },
        { text: this.$t('version'), value: 'data.version', align: 'center', sortable: false },
      ],
      selected: []
    }
  },
  methods: {
    updateSelectedDrafts(name, value) {
      this.$store.commit('setSelectedDrafts', this.selected )
    }
  }
}
</script>
