<template>
  <div class="awards mb-3">
    <div class="awards-card shadow-sm">
      <img
        v-if="image"
        :src="image"
        loading="lazy"
        alt="image awards"
        width="100%"
        height="100%"
      />
      <b-badge class="awards-type" :variant="colorType(type)">{{
        type
      }}</b-badge>
      <div class="awards-poin text-light">{{ $formatCurrency(poin) }} Poin</div>
    </div>
    <div class="awards-title text-left mt-1">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "AwardsComponent",
  props: {
    image: String,
    title: String,
    poin: Number,
    type: String,
  },
  methods: {
    colorType(type) {
      if (type === "PRODUCTS") {
        return "warning";
      } else if (type === "VOUCHERS") {
        return "primary";
      } else {
        return "secondary";
      }
    },
  },
};
</script>

<style>
.awards {
  cursor: pointer;
}

.awards-card {
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
  border-radius: 15px;
  position: relative;
}

.awards-type {
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 50px;
  padding: 8px !important;
  text-transform: capitalize !important;
}

.awards-poin {
  position: absolute;
  bottom: 10px;
  left: 10px;
  min-width: 50px;
  font-weight: bold;
}

.awards-title {
  font-weight: bolder;
  font-size: 18px;
}
</style>
