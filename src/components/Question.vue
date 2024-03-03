<template>
    <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1">
          <label class="form-check-label" for="inlineRadio1"> {{question.description}} </label>
    </div>
</template>
<script>
export default {
    props: ['question'],
    data() {

    }
}
</script>