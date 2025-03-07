<template>
  <!-- 下拉框容器，添加点击外部关闭指令 -->
  <div class="base-select-wrapper" v-click-outside="closeSelect">
    <!-- 选择框主体部分 -->
    <div 
      class="select-input"
      @click="toggleSelect"
      :class="{ 
        'is-disabled': disabled, // 禁用状态
        'is-active': isOpen     // 激活状态（下拉框打开时）
      }"
    >
      <!-- 显示选中的值或占位符文本 -->
      <span class="select-value" :class="{ 'placeholder': !selected }">
        {{ selected ? selected[labelKey] : placeholder }}
      </span>
      
      <!-- 下拉箭头图标 -->
      <van-icon 
        name="arrow-down" 
        class="select-arrow"
        :class="{ 
          'is-disabled': disabled, // 禁用状态
          'is-reverse': isOpen    // 箭头旋转状态
        }"
      />
    </div>

    <!-- 下拉选项面板，使用 transition 添加过渡动画 -->
    <transition name="slide-fade">
      <div class="select-dropdown" v-show="isOpen">
        <ul class="select-options">
          <!-- 选项列表 -->
          <li
            v-for="(item, index) in options"
            :key="item[valueKey]"
            class="select-option"
            :class="{
              'is-selected': selected && selected[valueKey] === item[valueKey], // 选中状态
              'is-disabled': item.disabled // 选项禁用状态
            }"
            @click="handleSelect(item)"
          >
            {{ item[labelKey] }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  
  // 自定义指令：点击外部关闭下拉框
  directives: {
    'click-outside': {
      // 绑定时添加点击事件监听
      bind(el, binding) {
        el.clickOutsideEvent = function(event) {
          // 判断点击是否发生在组件外部
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      // 解绑时移除事件监听
      unbind(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },

  props: {
    // v-model 绑定值
    value: {
      type: [String, Number],
      default: ''
    },
    // 选项数据数组
    options: {
      type: Array,
      default: () => []
    },
    // 选项标签的键名
    labelKey: {
      type: String,
      default: 'label'
    },
    // 选项值的键名
    valueKey: {
      type: String,
      default: 'value'
    },
    // 占位符文本
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,    // 下拉框是否打开
      selected: null    // 当前选中的选项对象
    }
  },

  watch: {
    // 监听 value 变化，更新选中项
    value: {
      handler(val) {
        this.updateSelected()
      },
      immediate: true // 组件创建时立即执行一次
    }
  },

  methods: {
    // 切换下拉框显示状态
    toggleSelect() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen
      }
    },

    // 处理选项选择
    handleSelect(item) {
      // 如果选项被禁用，直接返回
      if (item.disabled) return
      
      // 如果点击的是当前已选中的选项，只关闭下拉框
      if (this.selected && this.selected[this.valueKey] === item[this.valueKey]) {
        this.isOpen = false
        return
      }

      // 选择新的选项
      this.selected = item
      this.isOpen = false
      this.$emit('input', item[this.valueKey])
      this.$emit('change', item)
    },

    // 关闭下拉框
    closeSelect() {
      this.isOpen = false
    },

    // 更新选中项
    updateSelected() {
      if (!this.value) {
        this.selected = null
        return
      }
      // 根据 value 找到对应的选项对象
      this.selected = this.options.find(item => item[this.valueKey] === this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-select-wrapper {
  position: relative;
  width: 100%;

  .select-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 29px;
    padding: 0 12px;
    background-color: transparent;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
      .select-value {
        color: #c0c4cc;
      }
    }
  }

  .select-value {
    color: #3bbb8e;
    font-size: 14px;
    
    &.placeholder {
      color: #999;
    }
  }

  .select-arrow {
    color: #3bbb8e;
    font-size: 16px;
    transition: transform 0.3s ease;
    
    &.is-disabled {
      color: #c0c4cc;
    }

    &.is-reverse {
      transform: rotate(180deg);
    }
  }

  .select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    margin-top: 4px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow-y: auto;
  }

  .select-options {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .select-option {
    padding: 8px 12px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.is-selected {
      color: #3bbb8e;
      font-weight: 500;
      background-color: #f0f9eb;
    }

    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      background-color: #fff;

      &:hover {
        background-color: #fff;
      }
    }
  }
}

// 下拉动画
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style> 