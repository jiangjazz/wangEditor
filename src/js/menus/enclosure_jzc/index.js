/* eslint-disable */
/*
 * @Author: Janzen 
 * @Date: 2018-03-26 14:15:52 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-03-26 16:17:23
 */
/**
 * jzc
 * enclosure
 */
import $ from '../../util/dom-core.js'

// 构造函数
function Enclosure(editor) {
  this.editor = editor
  this.$elem = $(
    `<div class="w-e-menu">
      <i class="w-e-icon-link"><i/>
    </div>`
  )
  this.type = 'custom'

  // click action
  this._clickAction = function () {
  }

  // 当前是否 active 状态
  this._active = false
}

// 原型
Enclosure.prototype = {
  constructor: Enclosure,

  // 点击事件
  onClick: function (e) {
      // 点击菜单将触发这里
      const editor = this.editor
      const enclosureClick = editor.enclosureClick || this._clickAction
      enclosureClick()
  }
}

export default Enclosure
