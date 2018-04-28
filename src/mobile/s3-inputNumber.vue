<template>
  <!--@dragstart 对事件的完整写法-->
  <div
    @dragstart.prevent
    :class="[
      's3-input-number',
      inputNumberSize ? 's3-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]">
    <!--v-repeat-click="decrease"-->
    <span
      class="s3-input-number__decrease"
      role="button"
      v-if="controls"
      :class="{'is-disabled': minDisabled}"
      @click="decrease">
      <i >-</i>
    </span>
    <!--v-repeat-click="increase"-->
    <span
      class="s3-input-number__increase"
      role="button"
      v-if="controls"

      :class="{'is-disabled': maxDisabled}"
      @click="increase">
      <i>+</i>
    </span>
 <s3-input
      ref="input"
      :value="currentValue"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleInputChange">
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
    </s3-input>
  </div>
</template>
<script>

  import s3Input from './s3-input.vue'
  export default {
    name: 'S3InputNumber',
    inject: {
      s3Form: {
        default: ''
      },
      s3FormItem: {
        default: ''
      }
    },
    components: {
      s3Input
    },
    props: {
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {},
      disabled: Boolean,
      size: String,
      controls: {
        type: Boolean,
        default: true
      },
      controlsPosition: {
        type: String,
        default: ''
      },
      name: String,
      label: String
    },
    data() {
      return {
        currentValue: 0
      };
    },
    computed: {
      minDisabled() {
        return this._decrease(this.value, this.step) < this.min;
      },
      maxDisabled() {
        return this._increase(this.value, this.step) > this.max;
      },
      precision() {
        const { value, step, getPrecision } = this;
        return Math.max(getPrecision(value), getPrecision(step));
      },
      controlsAtRight() {
        return this.controlsPosition === 'right';
      },
      inputNumberSize() {
        return this.size;
      },
      inputNumberDisabled() {
        return this.disabled;
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = value === undefined ? value : Number(value);
          if (newVal !== undefined && isNaN(newVal)) return;
          if (newVal >= this.max) newVal = this.max;
          if (newVal <= this.min) newVal = this.min;
          this.currentValue = newVal;
          this.$emit('input', newVal);
        }
      }
    },
    methods: {
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.precision;
        return parseFloat(parseFloat(Number(num).toFixed(precision)));
      },
      getPrecision(value) {
        if (value === undefined) return 0;
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;
        const precisionFactor = Math.pow(10, this.precision);
        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      _decrease(val, step) {
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;
        const precisionFactor = Math.pow(10, this.precision);
        return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      },
      increase() {
        if (this.inputNumberDisabled || this.maxDisabled) return;
        const value = this.value || 0;
        const newVal = this._increase(value, this.step);
        this.setCurrentValue(newVal);
      },
      decrease() {
        if (this.inputNumberDisabled || this.minDisabled) return;
        const value = this.value || 0;
        const newVal = this._decrease(value, this.step);
        this.setCurrentValue(newVal);
      },
      handleBlur(event) {
        this.$emit('blur', event);
        this.$refs.input.setCurrentValue(this.currentValue);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) {
          this.$refs.input.setCurrentValue(this.currentValue);
          return;
        }
        this.$emit('input', newVal);
        this.$emit('change', newVal, oldVal);
        this.currentValue = newVal;
      },
      handleInputChange(value) {
        const newVal = value === '' ? undefined : Number(value);
        if (!isNaN(newVal) || value === '') {
          this.setCurrentValue(newVal);
        }
      }
    },

  };
</script>
<style>
 .s3-input-number {
    position: relative;
    display: inline-block;
    width: 180px;
    line-height: 38px;
  }
  .s3-input-number__decrease, .s3-input-number__increase {
      position: absolute;
      z-index: 1;
      top: 1px;
      width: 40px;
      height: auto;
      text-align: center;
      background: #f5f7fa;
      color: #606266;
      cursor: pointer;
      font-size: 13px;
  }
  .s3-input-number__decrease {
      left: 1px;
      border-radius: 4px 0 0 4px;
      border-right: 1px solid #dcdfe6;
  }
  .s3-input-number__increase {
      right: 1px;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #dcdfe6;
  }
  .s3-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
  }
  .s3-input-number .s3-input {
      display: block;
  }
  .s3-input__inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
  }
  .s3-input-number .s3-input__inner {
      -webkit-appearance: none;
      padding-left: 50px;
      padding-right: 50px;
      text-align: center;
  }
  .s3-input-number--medium {
      width: 200px;
      line-height: 34px;
  }
  .s3-input-number--small {
      width: 130px;
      line-height: 30px;
  }
  .s3-input-number--mini {
      width: 130px;
      line-height: 26px;
  }
  .s3-input-number.is-controls-right .s3-input-number__decrease{
    right:1px;
    bottom: 1px;
    top:auto;
    left: auto;
    border-right: none;
    border-left: 1px solid #dfdfdf;
    border-radius: 0 0 4px 0;
  }
 .s3-input-number.is-controls-right .s3-input-number__decrease,
 .s3-input-number.is-controls-right .s3-input-number__increase{
   height: auto;
   line-height: 19px;
 }
 .s3-input-number.is-controls-right .s3-input__inner{
   padding-left: 15px;
   padding-right: 50px;
 }
</style>
