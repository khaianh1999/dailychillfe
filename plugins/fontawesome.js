import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCoffee, faHeart, faBagShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'; // Add your desired icons here
// import { faHeart } from '@fortawesome/free-regular-svg-icons'; // Add icon regular
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Example for brand icons

// Disable auto CSS addition since Nuxt handles CSS
config.autoAddCss = false;

// Add the icons you need to the library
library.add(faUser, faCoffee, faFacebook, faTwitter, faHeart, faBagShopping, faMoneyBill);

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);
