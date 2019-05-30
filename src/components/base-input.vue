<template>
    <div class="base-input">
        <input 
            v-bind="$attrs"
            class="input" 
            :class="{'error': (touched || forceValidation) && !isValid()}"
            :value="value" 
            @input="handleInput"
            @blur="handleBlur" 
            v-if="placeholder" 
        >
        <span class="placeholder" :class="{'has-value': value}">{{placeholder}}</span>
    </div>
</template>

<script>
const validationRules = {
    required(value) {
        return !!value;
    }
}

export default {
    name: 'base-input',
    props: {
        validation: [String, Object],
        value: [String, Number],
        placeholder: String
    },
    data: () => ({
        touched: false,
        forceValidation: false
    }),
    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value);
        },
        handleBlur(event) {
            this.touched = true;
        },
        isValid() {
            if (typeof this.validation === 'string') {
                for (let rule of this.validation.split('|')) {
                    if (!validationRules[rule](this.value)) return false;
                }
            } else if (typeof this.validation === 'object') {
                for (let ruleKey of Object.keys(this.validation)) {
                    if (!validationRules[ruleKey](this.value, this.validation[ruleKey])) return false;
                }
            }
            return true;
        },
        validate() {
            this.forceValidation = true;
            return this.isValid();
        },
        clear() {
            this.touched = false;
            this.forceValidation = false;
        }
    }
}   
</script>

<style lang="scss">
    @import '../styles';

    $input-horizontal-padding: 15px;
    
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    .base-input {
        position: relative;
        width: 100%;
        color: $color-text;

        .input {
            display: inline-block;
            color: $color-text;
            width: 100%;
            vertical-align: bottom;
            font-size: $font-size-base;
            background-color: transparent;
            border: 1px solid $color-border;
            border-radius: 4px;
            height: 40px;
            line-height: 40px;
            padding: 0 $input-horizontal-padding;
            box-sizing: border-box;

            &:focus {
                outline: none;
                border-color: $color-active-border;
            }

            &.error {
                border-color: $color-error;
            }
        }

        .placeholder {
            z-index: -1;
            position: absolute;
            color: $color-text-light;
            transform: translateY(-50%);
            top: 50%;
            left: $input-horizontal-padding;
            transition: {
                property: transform, font-size;
                duration: 0.2s;
                timing-function: ease-in-out;
            }
        }

        .input:focus+.placeholder, .placeholder.has-value {
            transform: translate(-5px, -27px); 
            font-size: 12px;
            z-index: 0;
            color: $color-active-text;
            background-color: $color-background;
        }

        .input.error+.placeholder{
            color: $color-error
        }
    }
</style>
