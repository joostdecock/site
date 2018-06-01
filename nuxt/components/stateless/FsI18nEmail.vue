<template>
  <div>
    <div class="text-xs-center mt-3 mb-3">
      <h3>{{ $t('emails')}}</h3>
      <v-progress-circular size="100" :value="score" :rotate="(-90)" :width="(12)" :color="$fs.percentColor(score)">{{score}}%</v-progress-circular>
      <p class="mt-3">
        <v-btn color="primary" href="https://github.com/freesewing/data/tree/v2/locales">
          <fs-icon-github color="#FFF" class="mr-3" />
            {{ $t('editOnGithub') }}
        </v-btn>
      </p>
    </div>
    <v-data-table
      :headers="headers"
      :items="email"
      :pagination.sync="pagination"
      must-sort
      class="elevation-1"
      v-model="selected"
      :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
      :rows-per-page-text="$t('rowsPerPage')"
    >
      <template slot="items" slot-scope="props">
        <td>
            {{ props.item.en }}
        </td>
        <td>
            {{ props.item.val.replace('DONE', '').replace('TODO','').trim() }}
        </td>
        <td>
          <v-icon color="error" v-if="props.item.missing">error_outline</v-icon>
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
import FsIconGithub from '~/components/stateless/FsIconGithub'
export default {
  name: 'FsI18nEmail',
  components: {
    FsIconGithub
  },
  props: {
    locale: {
      type: String,
      required: true
    },
    email: {
      type: Array,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' '+this.$t('en'), value: 'en' },
        { text: ' '+this.$t(this.locale), value: this.locale },
        { text: ' '+this.$t('status'), value: 'missing' }
      ],
      selected: [],
      pagination: {
        sortBy: 'missing',
        descending: true
      }
    }
  }
}
</script>
