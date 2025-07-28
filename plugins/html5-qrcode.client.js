// plugins/html5-qrcode.client.js

import Vue from 'vue'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'

// Make them available globally in your Vue components
Vue.prototype.$Html5Qrcode = Html5Qrcode
Vue.prototype.$Html5QrcodeScanner = Html5QrcodeScanner
