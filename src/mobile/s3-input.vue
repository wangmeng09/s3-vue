<template>
  <div :class="[
    type === 'textarea' ? 's3-textarea' : 's3-input',
    inputSize ? 's3-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      's3-input-group': $slots.prepend || $slots.append,
      's3-input-group--append': $slots.append,
      's3-input-group--prepend': $slots.prepend,
      's3-input--prefix': $slots.prefix || prefixIcon,
      's3-input--suffix': $slots.suffix || suffixIcon
    }
    ]"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="s3-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="s3-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="s3-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="s3-input__icon iconfont"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="s3-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="s3-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="s3-input__icon iconfont"
               v-if="suffixIcon"
               :class="suffixIcon">
            </i>
          </template>
          <i v-else
             class="s3-input__icon iconfont icon-guanbi2 s3-input__clear "
             @click="clear"
          ></i>
        </span>
        <i class="s3-input__icon iconfont"
           v-if="validateState"
           :class="['s3-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="s3-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

    <textarea
      v-else
      :tabindex="tabindex"
      class="s3-textarea__inner"
      :value="currentValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
  export default {
    name: 'S3Input',
    componentName: 'S3Input',
    data() {
      return {
        currentValue: this.value === undefined ? '' : this.value,
        textareaCalcStyle: {},
        prefixOffset: null,
        suffixOffset: null,
        hovering: false,
        focused: false,
        isOnComposition: false
      };
    },
    props: {
      value: [String, Number],
      size: String,
      form: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },
    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      validateState() {
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.elForm ? this.elForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'el-icon-loading',
          success: 'el-icon-circle-check',
          error: 'el-icon-circle-close'
        }[this.validateState];
      },
      textareaStyle() {
        return this.autosize || {width:"200px",height:"33px"};
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      },
      isGroup() {
        return this.$slots.prepend || this.$slots.append;
      },
      showClear() {
        return this.clearable && !this.disabled && this.currentValue !== '' && (this.focused || this.hovering);
      }
    },
    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },
    methods: {
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      blur() {
        (this.$refs.input || this.$refs.textarea).blur();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
      },
      select() {
        (this.$refs.input || this.$refs.textarea).select();
      },

      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleComposition(event) {
        if (event.type === 'compositionend') {
          this.isOnComposition = false;
          this.handleInput(event);
        } else {
          const text = event.target.value;
          const lastCharacter = text[text.length - 1] || '';
//          this.isOnComposition = !isKorean(lastCharacter);
        }
      },
      handleInput(event) {
        if (this.isOnComposition) return;
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;

      },
      calcIconOffset(place) {
        const pendantMap = {
          'suf': 'append',
          'pre': 'prepend'
        };
        const pendant = pendantMap[place];
        if (this.$slots[pendant]) {
          return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.s3-input-group__${pendant}`).offsetWidth}px)` };
        }
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
        this.setCurrentValue('');
        this.focus();
      }
    },
    created() {
      this.$on('inputSelect', this.select);
    },
    mounted() {
      if (this.isGroup) {
        this.prefixOffset = this.calcIconOffset('pre');
        this.suffixOffset = this.calcIconOffset('suf');
      }
    }
  };
</script>
<style>
  .s3-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  .s3-input-group {
    line-height: normal;
    display: inline-table;
    border-collapse: separate;
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
  .s3-input.is-disabled .s3-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .s3-input--suffix .s3-input__inner {
    padding-right: 30px;
  }
  .s3-input__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
  }
  .s3-input__suffix-inner {
    pointer-events: all;
  }
  .s3-input__icon, .s3-input__prefix {
    height: 100%;
    text-align: center;
    transition: all .3s;
  }
  .s3-input__icon {
    width: 25px;
    line-height: 40px;
  }
  .s3-input__prefix {
    position: absolute;
    left: 5px;
    top: 0;
    color: #c0c4cc;
  }
  .s3-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
  }
  .s3-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }


  .s3-input-group__prepend,.s3-input-group__append {
    background-color: #f5f7fa;
    color: #999;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  .s3-input-group__prepend {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .s3-input-group--prepend .s3-input__inner{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .s3-input-group--append .s3-input__inner{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .s3-input-group__append {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .s3-input-group__append button.s3-button, .s3-input-group__append div.s3-select .s3-input__inner, .s3-input-group__append div.s3-select:hover .s3-input__inner, .s3-input-group__prepend button.s3-button, .s3-input-group__prepend div.s3-select .s3-input__inner, .s3-input-group__prepend div.s3-select:hover .s3-input__inner {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0;
  }
  .s3-input__suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
  }
  .s3-input__suffix-inner {
    pointer-events: all;
  }
  .s3-select .s3-input .s3-select__caret {
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    line-height: 16px;
    cursor: pointer;
  }
  .s3-input--medium .s3-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .s3-input--small .s3-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .s3-input--mini .s3-input__inner {
    height: 28px;
    line-height: 28px;
  }

  .s3-input--prefix .s3-input__inner{
    padding-left: 30px;
  }

</style>
