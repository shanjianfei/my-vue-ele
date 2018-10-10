<template>
  <div class="food-list-container">
    <ul>
      <head>{{food.name}}  {{food.description}}</head>
      <li v-for="(item, index) in food" :key="index">
        {{item.description}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted: function () {
    console.log(this.food)
  },
  props: ['food']
}
</script>