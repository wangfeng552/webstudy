<script setup>
import { getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance()
console.log(proxy.name)
</script>
