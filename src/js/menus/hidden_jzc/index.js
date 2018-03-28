/* eslint-disable */
/*
 * @Author: Janzen 
 * @Date: 2018-03-26 14:15:52 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-28 09:39:23
 */
/**
 * jzc
 * hidden
 */
import $ from '../../util/dom-core.js'

// 构造函数
function Hidden(editor) {
  this.editor = editor
  this.$elem = $(
    `<div class="w-e-menu">
      <i class="w-jzc-icon-hidden"><i/>
    </div>`
  )
  this.type = 'custom'

  // click action
  this._clickAction = function () {}

  // 当前是否 active 状态
  this._active = false
}

// 原型
Hidden.prototype = {
  constructor: Hidden,

  // 点击事件
  onClick: function (e) {
    // 点击菜单将触发这里
    const editor = this.editor
    const hiddenClick = editor.hiddenClick || this._clickAction
    hiddenClick()
  }
}

export default Hidden