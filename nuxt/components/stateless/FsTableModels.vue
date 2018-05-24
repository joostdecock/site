<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    select-all
    must-sort
    class="elevation-1"
    v-model="selected"
    :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
    :rows-per-page-text="$t('rowsPerPage')"
    @input="updateSelectedModels()"
  >
    <template slot="items" slot-scope="props">
      <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
      <td class="text-xs-center">
        <v-avatar size="36">
          <img :src="$fs.modelAvatar(props.item.pictureSrc)" />
        </v-avatar>
      </td>
      <td>
        <nuxt-link :to="$fs.path('/models/'+props.item.handle)">
          {{ props.item.handle }}
        </nuxt-link>
      </td>
      <td class="text-xs-center">
        <nuxt-link :to="$fs.path('/models/'+props.item.handle)">
          {{ props.item.name }}
        </nuxt-link>
      </td>
      <td class="text-xs-center">
        {{ (typeof props.item.data.measurements === 'object') ? Object.keys(props.item.data.measurements).length : 0 }}
      </td>
      <td class="text-xs-center">
        {{ $fs.daysAgo(props.item.created) }}
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
      { text: '🙂', value: 'handle', align: 'center', sortable: false },
        { text: ' #', value: 'handle', align: 'center' },
        { text: ' '+this.$t('name'), value: 'name', align: 'center' },
        { text: ' '+this.$t('measurements'), value: 'model', align: 'center' },
        { text: ' '+this.$t('date'), value: 'created', align: 'center' },
      ],
      selected: [],
      pagination: {
        sortBy: 'created',
        descending: true
      },
    }
  },
  methods: {
    updateSelectedModels() {
      this.$store.commit('setSelectedModels', this.selected )
    }
  }
}
</script>
