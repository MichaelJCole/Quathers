<template>
  <form-auth @logged-in="$emit('closeMe')">
    <!--our child element (a close button) is passed to form-auth's slot(name="close") -->
    <template v-slot:close>
      <slot></slot>
    </template>
  </form-auth>
</template>
