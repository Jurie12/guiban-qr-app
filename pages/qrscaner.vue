<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="4" class="pa-4">
          <v-card-title class="d-flex align-center justify-center">
            <v-icon color="primary" large class="mr-2">mdi-qrcode-scan</v-icon>
            <span class="text-h6 font-weight-medium">QR Code Scanner</span>
          </v-card-title>

          <v-divider class="my-4" />

          <v-row align="center" justify="center" class="mb-2">
            <v-icon color="grey darken-1" class="mr-2">mdi-camera</v-icon>
            <span class="subtitle-2">Place the QR code within the frame</span>
          </v-row>

          <div id="reader" class="qr-box mb-4"></div>

          <v-row align="center" justify="center">
            <v-icon color="info" class="mr-2">mdi-information-outline</v-icon>
            <span class="caption grey--text">Scanning will stop after a successful scan.</span>
          </v-row>

          <v-alert
            v-if="result"
            type="success"
            class="mt-4"
            border="left"
            colored-border
            elevation="2"
            icon="mdi-check"
          >
            <strong>Scanned:</strong> {{ result }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Html5QrcodeScanner } from 'html5-qrcode'

const result = ref('')
let html5QrcodeScanner = null

const onScanSuccess = (decodedText) => {
  result.value = decodedText
  console.log('✅ QR Code:', decodedText)
  html5QrcodeScanner.clear()
}

const onScanFailure = (error) => {
  console.warn('Scan error:', error)
}

onMounted(() => {
  html5QrcodeScanner = new Html5QrcodeScanner(
    'reader',
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  )
  html5QrcodeScanner.render(onScanSuccess, onScanFailure)
})

onBeforeUnmount(() => {
  if (html5QrcodeScanner) {
    html5QrcodeScanner.clear().catch(e => console.error("Clear failed", e))
  }
})
</script>

<style scoped>
.qr-box {
  width: 100%;
  max-width: 400px;
  margin: auto;
  background-color: #000; /* only the scanner box is dark */
  border-radius: 10px;
  padding: 10px;
}
</style>
