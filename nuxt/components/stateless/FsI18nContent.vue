<template>
  <div>
    <div class="text-xs-center mt-3 mb-3">
      <v-layout row wrap>
        <v-flex xs-4 v-for="type in $fs.conf.content" :key="type">
          <h5>{{ $t(type) }}</h5>
          <v-progress-circular size="100"
            :value="content.score[type]"
            :rotate="(-90)" :width="(12)"
            :color="$fs.percentColor(content.score[type])">
            {{content.score[type]}}%
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
    <v-data-table
      :headers="headers"
      :items="content.items"
      :pagination.sync="pagination"
      must-sort
      class="elevation-1"
      v-model="selected"
      :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
      :rows-per-page-text="$t('rowsPerPage')"
    >
      <template slot="items" slot-scope="props">
        <td>
          <nuxt-link :to="props.item.item.permalink">{{ props.item.item.permalink }}</nuxt-link>
        </td>
        <td>{{ $t(props.item.type) }}</td>
        <td>
          {{ props.item.item.title }}
        </td>
        <td>
          <v-btn v-if="!props.item.translated" target="_BLANK" :href="editLink(props.item)" color="primary">
            <fs-icon-github class="mr-3" color="#FFF"/>
            {{ $t('editOnGithub')}}
          </v-btn>
        </td>
        <td>
          <v-icon color="error" v-if="!props.item.translated">error_outline</v-icon>
          <v-icon v-else color="success">check_circle</v-icon>
        </td>
      </template>
      <template slot="pageText" slot-scope="props">
        {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
      </template>
      <template slot="no-data">
      <blockquote class="mt-5 mb-5 text-xs-center fs-bq">
          <h3>{{ $t('justAMoment') }}</h3>
          <p>{{ $t('weAreLoadingDataFromTheBackend') }}</p>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </blockquote>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import FsIconGithub    from '~/components/stateless/FsIconGithub'
export default {
  name: 'FsI18nContent',
  components: {
    FsIconGithub
  },
  props: {
    locale: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' '+this.$t('key'), value: 'item.permalink' },
        { text: ' '+this.$t('type'), value: 'type' },
        { text: ' '+this.$t('title'), value: 'item.title' },
        { text: ' '+this.$t('translate'), value: 'translated', sortable: false },
        { text: ' '+this.$t('status'), value: 'translated' }
      ],
      selected: [],
      pagination: {
        sortBy: 'translated',
        descending: true
      },
      items: [],
      lang: {},
      score: 0,
      count: 0,
      missing: 0,
    }
  },
  methods: {
    editLink(item) {
      let link = 'https://github.com/freesewing/site/edit/develop/nuxt/content'
      link += item.item.meta.dirName+item.item.meta.section
      if(item.item.meta.section !== '/') link += '/'
      link += item.item.meta.fileName
      return link
    }
  }
}
</script>
