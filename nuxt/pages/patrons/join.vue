<template>
  <div>
    <v-layout row wrap>
      <v-flex sm4 style="padding: 8px">
        <v-card>
          <v-card-title>
            <img src="/img/patrons/medals/medal-2.svg" alt="The Powder Monkey medal" class="medal">
          </v-card-title>
          <v-card-text>
            <p class="tier"><b>{{ $t('patron-2') }}</b></p>
            <p class="price">2€<span class="fine-print">per month</span></p>
            <ul class="perks">
              <li>Free for all:</li>
              <li v-for="item in free" :key="item">
                <v-icon class="mr-3" color="success">check_circle</v-icon> {{ item }}
              </li>
              <li class="mt-2">The perks:</li>
              <li v-for="(item, i) in perks" :key="item">
                <v-icon class="mr-3" v-if="i<5" color="success">check_circle</v-icon>
                <v-icon class="mr-3" v-else color="error">cancel</v-icon>
                {{ item }}
              </li>
            </ul>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-monkey">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - Powder Monkey">
              <input type="hidden" name="item_number" value="patron-pm">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="2.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="M">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="text-xs-center">
              <input type="submit" name="submit" alt="Submit" value="Sign up now" class="btn primary px-5 mt-3">
              </p>
            </form>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-monkey-yearly">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - Powder Monkey - Yearly">
              <input type="hidden" name="item_number" value="patron-pm-y">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="24.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="Y">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="mt-3"><small>Same but different:</small>
              <input type="submit" name="submit" alt="Submit" value="Pay yearly" class="btn btn--flat btn--large">
              </p>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm4 style="padding: 8px">
        <v-card>
          <v-card-title>
            <img src="/img/patrons/medals/medal-4.svg" alt="The First Mate medal" class="medal">
          </v-card-title>
          <v-card-text>
            <p class="tier"><b>{{ $t('patron-4') }}</b></p>
            <p class="price">4€<span class="fine-print">per month</span></p>
            <ul class="perks">
              <li>Free for all:</li>
              <li v-for="item in free" :key="item">
                <v-icon class="mr-3" color="success">check_circle</v-icon> {{ item }}
              </li>
              <li class="mt-2">The perks:</li>
              <li v-for="(item, i) in perks" :key="item">
                <v-icon class="mr-3" v-if="i<7" color="success">check_circle</v-icon>
                <v-icon class="mr-3" v-else color="error">cancel</v-icon>
                {{ item }}
              </li>
            </ul>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-mate">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - First Mate">
              <input type="hidden" name="item_number" value="patron-fm">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="4.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="M">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="text-xs-center">
              <input type="submit" name="submit" alt="Submit" value="Sign up now" class="btn primary px-5 mt-3 btn--large">
              </p>
            </form>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-mate-yearly">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - First Mate - Yearly">
              <input type="hidden" name="item_number" value="patron-fm-y">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="48.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="Y">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="mt-3"><small>Same but different:</small>
              <input type="submit" name="submit" alt="Submit" value="Pay yearly" class="btn btn--flat">
              </p>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm4 style="padding: 8px">
        <v-card>
          <v-card-title>
            <img src="/img/patrons/medals/medal-8.svg" alt="The Captain medal" class="medal">
          </v-card-title>
          <v-card-text>
            <p class="tier"><b>{{ $t('patron-8') }}</b></p>
            <p class="price">8€<span class="fine-print">per month</span></p>
            <ul class="perks">
              <li>Free for all:</li>
              <li v-for="item in free" :key="item">
                <v-icon class="mr-3" color="success">check_circle</v-icon> {{ item }}
              </li>
              <li class="mt-2">The perks:</li>
              <li v-for="item in perks" :key="item">
                <v-icon class="mr-3" color="success">check_circle</v-icon>
                {{ item }}
              </li>
            </ul>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-captain">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - Captain">
              <input type="hidden" name="item_number" value="patron-capt">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="8.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="M">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="text-xs-center">
              <input type="submit" name="submit" alt="Submit" value="Sign up now" class="btn primary px-5 mt-3 btn--large">
              </p>
            </form>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="form-patron-captain-yearly">
              <input type="hidden" name="cmd" value="_xclick-subscriptions">
              <input type="hidden" name="business" value="info@freesewing.org">
              <input type="hidden" name="lc" value="BE">
              <input type="hidden" name="item_name" value="Freesewing Patron - Captain - Yearly">
              <input type="hidden" name="item_number" value="patron-capt">
              <input type="hidden" name="no_note" value="1">
              <input type="hidden" name="no_shipping" value="2">
              <input type="hidden" name="rm" value="1">
              <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you">
              <input type="hidden" name="src" value="1">
              <input type="hidden" name="a3" value="96.00">
              <input type="hidden" name="p3" value="1">
              <input type="hidden" name="t3" value="Y">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted">
              <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
              <p class="mt-3"><small>Same but different:</small>
              <input type="submit" name="submit" alt="Submit" value="Pay yearly" class="btn btn--flat">
              </p>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div class="fs-m800 fs-content mt-5 fs-pad elevation-1">
      <h2>Or make a one-time donation instead</h2>
    <p class="text-xs-left">While becoming a Patron is the best way to support Freesewing, a one-time donation is always welcome.</p>
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="hidden" id="form-donate">
    <input type="hidden" name="cmd" value="_donations">
    <input type="hidden" name="business" value="info@freesewing.org">
    <input type="hidden" name="lc" value="BE">
    <input type="hidden" name="item_name" value="Freesewing">
    <input type="hidden" name="item_number" value="Donation">
    <input type="hidden" name="currency_code" value="EUR">
    <input type="hidden" name="no_note" value="1">
    <input type="hidden" name="no_shipping" value="1">
    <input type="hidden" name="rm" value="1">
    <input type="hidden" name="return" value="https://freesewing.org/patrons/thank-you-donation">
    <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHosted">
    <input type="hidden" name="image_url" value="https://data.freesewing.org/static/img/paypal-logo.png">
    <input type="submit" name="submit" alt="Submit" value="Donate" class="btn primary btn--large px-4">
  </form>
    <blockquote class="tip">
      <h5>Or you here because you're not able to make recurring payments?</h5>
      <p>PayPal does not allow recurring payments from all countries/banks/cards.
      If you find yourself in this this situation and would like to be a patron, you can make a one-time donation instead.</p>
      <ul>
        <li>Donations of 24&euro; or more make you a Powder Monkey for one year</li>
        <li>Donations of 48&euro; or more make you a First Mate for one year</li>
        <li>Donations of 96&euro; or more make you a Captain for one year</li>
      </ul>
      <p>This conversion is optional. We'll contact you to ask how you'd like to do it.</p>
    </blockquote>
    </div>


  </div>
</template>

<script>
export default {
  layout: 'wide',
  data: function() {
    return {
      free: ['Free account', 'No ads', 'All our patterns', 'All our source code'],
      perks: {
        1: 'Unlimited models',
        2: 'Unlimited drafts',
        3: 'Priority support',
        4: 'Recognition',
        5: 'A share of the booty',
        6: 'A berth on the Antverpia',
        7: 'Even more booty',
        8: "A Captain's birthday salute"
      }
    }
  }
}
</script>

<style scoped>
img.medal {
  max-width: 50%;
  margin: auto;
}
p {
  text-align: center;
}
p.tier {
  text-align: center;
  font-size: 110%;
  font-weight: bold;
}
p.price {
  font-size: 80px;
  font-weight: 200;
  line-height: 1;
}
p.price span.fine-print {
  font-size: 16px;
  display: block;
  margin: 0;
}
li {
  list-style-type: none;
}
</style>
