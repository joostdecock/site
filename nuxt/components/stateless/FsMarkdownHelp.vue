<template>
  <table class="table fs-info-table">
    <thead>
      <tr>
        <th class="text-xs-left">{{ $t('markdownSyntax') }}</th>
        <th class="text-xs-left">{{ $t('result') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in snippets" :key="s">
        <td>{{s}}</td>
        <td v-html="$fs.md.render(''+s)"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'FsMarkdownHelp',
  data () {
    return {
      snippets: [
      '*'+this.$i18n.t('italics')+'*',
      '**'+this.$i18n.t('bold')+'**',
      '~~'+this.$i18n.t('strikethrough')+'~~',
      '> '+this.$i18n.t('blockquote'),
      '['+this.$i18n.t('freesewing')+'](https://freesewing.org)',
      '![](https://freesewing.org/img/logo/spinner.svg)',
      '`'+this.$i18n.t('code')+'`',
      "```\n"+this.$i18n.t('aCodeBlock')+"\n```",
      ]
    }
  }
}
</script>
