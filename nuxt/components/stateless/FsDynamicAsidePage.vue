<template>
  <div>
    <v-card v-if="page.toc">
      <v-card-title class="fs-card-title">
        {{ $t('contents') }}
      </v-card-title>
      <v-divider></v-divider>
        <fs-table-of-contents :toc="page.toc"/>
    </v-card>
    <v-card class="mt-3">
      <v-card-title class="fs-card-title">
       {{ $t('makeItBetter') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="fs-pad">
        <p>{{ $t('txt-didYouSpotATypo') }}</p>
        <p>{{ $t('txt-editThisPageOnline') }}</p>
        <p class="text-xs-right mb-0">
        <v-btn
          color="primary"
          :href="'https://github.com/freesewing/site/edit/develop/nuxt/content/'+page.meta.dirName+page.meta.section+'/'+page.meta.fileName"
          ><v-icon class="mr-3">edit</v-icon>{{ $t('editOnGithub') }}</v-btn>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FsTableOfContents from '~/components/stateless/FsTableOfContents'
export default {
  name: 'FsDynamicAsidePage',
  components: {
    FsTableOfContents
  },
  computed: {
    page () {
      return this.$store.state.components.data['page']
    }
  }
}
</script>
