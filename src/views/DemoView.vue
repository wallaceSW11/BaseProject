<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">BaseLib - Component Demo</h1>
        <p class="text-subtitle-1 mb-8">Exemplos práticos de todos os componentes e utilitários da BaseLib</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap">
              <PrimaryButton class="mr-4 mb-2" text="Primary" icon="mdi-check" @click="handleButtonClick('Primary')" />
              <SecondaryButton class="mr-4 mb-2" text="Secondary" icon="mdi-information"
                @click="handleButtonClick('Secondary')" />
              <TertiaryButton class="mr-4 mb-2" text="Tertiary" icon="mdi-star"
                @click="handleButtonClick('Tertiary')" />
              <QuartenaryButton class="mr-4 mb-2" text="Quartenary" icon="mdi-alert"
                @click="handleButtonClick('Quartenary')" />
              <PrimaryButton class="mb-2" text="Disabled" :disabled="true" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Notifications</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap">
              <v-btn class="mr-4 mb-2" color="success" @click="showNotification('success')">
                Success Notification
              </v-btn>
              <v-btn class="mr-4 mb-2" color="error" @click="showNotification('error')">
                Error Notification
              </v-btn>
              <v-btn class="mr-4 mb-2" color="warning" @click="showNotification('warning')">
                Warning Notification
              </v-btn>
              <v-btn class="mb-2" color="info" @click="showNotification('info')">
                Info Notification
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Theme Configuration</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <p class="text-subtitle-2 mb-2">Current Theme: <strong>{{ currentTheme }}</strong></p>
              <p class="text-subtitle-2 mb-4">App Name: <strong>{{ themeStore.appName }}</strong></p>
            </div>

            <div class="mb-4">
              <h4 class="mb-2">Theme Colors:</h4>
              <div class="d-flex flex-wrap">
                <v-chip v-for="(value, name) in themeStore.currentColors" :key="name" :color="String(name)"
                  class="mr-2 mb-2" label>
                  {{ name }}: {{ value }}
                </v-chip>
              </div>
            </div>

            <v-btn color="primary" @click="themeStore.toggleTheme()">
              Toggle Theme
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Loading Overlay</v-card-title>
          <v-card-text>
            <v-btn color="primary" @click="showLoading">
              Show Loading (3 seconds)
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Confirm Dialog</v-card-title>
          <v-card-text>
            <v-btn color="primary" @click="showConfirm">
              Show Confirmation
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Icon Tooltip</v-card-title>
          <v-card-text>
            <div class="d-flex align-center">
              <IconToolTip class="mr-4" icon="mdi-help-circle" text="Help tooltip" />
              <IconToolTip class="mr-4" icon="mdi-information" text="Information tooltip" />
              <IconToolTip class="mr-4" icon="mdi-delete" text="Delete action" as-button />
              <IconToolTip icon="mdi-pencil" text="Edit action" :as-button="true" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Pinia Store</v-card-title>
          <v-card-text>
            <p class="mb-4">Counter: {{ appStore.counter }} (Double: {{ appStore.doubleCounter }})</p>
            <v-btn color="primary" @click="appStore.increment()">
              Increment Counter
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { useThemeStore } from '@wallacesw11/base-lib/stores'
import { useGlobals } from '@wallacesw11/base-lib'
import { IconToolTip } from '@wallacesw11/base-lib'

const { notify, loading, confirm } = useGlobals()

const appStore = useAppStore()
const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.currentMode)

const handleButtonClick = (buttonType: string) => {
  notify('info', 'Button Clicked', `You clicked the ${buttonType} button!`)
}

const showNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
  const messages = {
    success: { title: 'Success!', message: 'Operation completed successfully' },
    error: { title: 'Error!', message: 'Something went wrong' },
    warning: { title: 'Warning!', message: 'Please check this carefully' },
    info: { title: 'Information', message: 'Here is some useful information' },
  }

  const { title, message } = messages[type]
  notify(type, title, message)
}

const showLoading = () => {
  loading(true, 'Processing your request...')
  setTimeout(() => {
    loading(false)
    notify('success', 'Done!', 'Loading completed')
  }, 3000)
}

const showConfirm = async () => {
  const confirmed = await confirm('Are you sure you want to proceed?', 'Choose your option')

  if (confirmed) {
    notify('success', 'Confirmed', 'You chose Yes')
  } else {
    notify('error', 'Cancelled', 'You chose No')
  }
};
</script>
