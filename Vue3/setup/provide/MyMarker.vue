<template>
  <div></div>
</template>

<script>
import { inject } from "vue"
export default {
  setup() {
    const userLocation = inject("location", "The Universe")
    const uesrGeolocation = inject("geolocation")
    const updateUserLocation = inject("updateLocation")
    return {
      userLocation,
      uesrGeolocation,
      updateUserLocation,
    }
  },
}
</script>
