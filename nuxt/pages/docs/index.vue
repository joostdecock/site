<template>
  <section class="page">
    <fs-breadcrumbs>{{ $t('documentation') }}</fs-breadcrumbs>
    <h1>{{ $t('documentation') }}</h1>
    <v-layout row wrap>
      <v-flex md3 sm6 xs12 style="padding: 0 4px">
        <div class="fs-content elevation-1 fs-pad">
          <h4>{{ $t('basics') }}</h4>
          <ul>
            <li><nuxt-link :to="$fs.path('/about')">{{ $t('aboutFreesewing') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/contact')">{{ $t('contactUs') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/privacy')">{{ $t('privacyNotice') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/rights')">{{ $t('yourRights') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/about/moderation-policy')">{{ $t('moderationPolicy') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/about/origin')">{{ $t('originStory') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/about/pledge')">{{ $t('donationsPledge') }}</nuxt-link></li>
          </ul>
        </div>
        <div class="fs-content elevation-1 fs-pad mt-3">
          <h4>{{ $t('learnMore') }}</h4>
          <ul>
            <li><nuxt-link :to="$fs.path('/docs/tutorial')">{{ $t('learnToDesignPatterns') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/core')">{{ $t('documentationForDevelopers') }}</nuxt-link></li>
            <li><a href="/cheatsheet.pdf">{{ $t('apiCheatSheet') }}</a></li>
          </ul>
        </div>
        <div class="fs-content elevation-1 fs-pad mt-3">
          <h4>{{ $t('forContributors') }}</h4>
          <ul>
            <li><nuxt-link :to="$fs.path('/docs/contribute')">{{ $t('contributeToFreesewing') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/i18n')">{{ $t('documentationForTranslators') }}</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/about/code-of-conduct')">{{ $t('codeOfConduct') }}</nuxt-link></li>
          </ul>
        </div>
      </v-flex>
      <v-flex md3 sm6 xs12 style="padding: 0 4px">
        <div class="fs-content elevation-1 fs-pad">
          <h4>{{ $t('patternInstructions') }}</h4>
          <ul>
            <li v-for="(patterns, namespace) in $fs.conf.namespaces" :key="namespace">{{namespace}}
              <ul>
                <li v-for="pattern in patterns" :key="pattern"><nuxt-link :to="$fs.path('/docs/patterns/'+pattern)">{{$fs.ucfirst(pattern)}}</nuxt-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </v-flex>
      <v-flex md3 sm6 xs12 style="padding: 0 4px">
        <div class="fs-content elevation-1 fs-pad">
          <h4>{{ $t('howToTakeMeasurements') }}</h4>
          <ul>
            <li v-for="measurement in $fs.conf.measurements.all" :key="measurement">
              <nuxt-link :to="$fs.path('/docs/measurements/'+measurement.toLowerCase())">{{ $t(measurement) }}</nuxt-link>
            </li>
          </ul>
        </div>
      </v-flex>
      <v-flex md3 sm6 xs12 style="padding: 0 4px">
        <div class="fs-content elevation-1 fs-pad">
          <h4>{{ $t('sewing') }}</h4>
          <ul>

            <li><nuxt-link :to="$fs.path('/docs/sewing/basic-sewing-supplies')">Basic sewing supplies</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/basting')">Basting</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/coverlock')">Coverlock</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/cutting')">Cutting</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/darts')">Darts</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/double-welt-pockets')">Double welt pockets</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/ease')">Ease</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/fabric-grain')">Fabric grain</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/good-sides-together')">Good sides together</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/hemming')">Hemming</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/jersey')">Jersey</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/knit-binding')">Knit binding</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/knit-fabric')">Knit fabric</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/pinning')">Pinning</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/rayon')">Rayon</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/seam-allowance')">Seam allowance</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/serger')">Serger</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/topstitching')">Topstitching</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/trimming')">Trimming</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/twin-needle')">Twin needle</nuxt-link></li>
            <li><nuxt-link :to="$fs.path('/docs/sewing/zig-zag-stitch')">Zig-zag stitch</nuxt-link></li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs
  }
}
</script>
