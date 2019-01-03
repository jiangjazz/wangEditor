/*
    menu - img
*/
import $ from '../../util/dom-core.js'
import { getRandom, arrForEach } from '../../util/util.js'
import Panel from '../panel.js'

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this
            setTimeout(function () {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
                var len = binStr.length
                var arr = new Uint8Array(len)

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }

                callback(new Blob([arr], {
                    type: type || 'image/png'
                }))

            })
        }
    })
}

// 构造函数
function Image(editor) {
    this.editor = editor
    const imgMenuId = getRandom('w-e-img')
    this.$elem = $('<div class="w-e-menu" id="' + imgMenuId + '"><i class="w-e-icon-image"><i/></div>')
    editor.imgMenuId = imgMenuId
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
    // 是否要压缩 add by jzc
    this._compress = true
    this._percentages = this.editor.config.uploadCompress // 压缩百分比
}

// 原型
Image.prototype = {
    constructor: Image,

    onClick: function () {
        const editor = this.editor
        const config = editor.config
        if (config.qiniu) {
            return
        }
        if (this._active) {
            this._createEditPanel()
        } else {
            this._createInsertPanel()
        }
    },

    _createEditPanel: function () {
        const editor = this.editor

        // id
        const width30 = getRandom('width-30')
        const width50 = getRandom('width-50')
        const width100 = getRandom('width-100')
        const delBtn = getRandom('del-btn')

        // tab 配置
        const tabsConfig = [
            {
                title: '编辑图片',
                tpl: `<div>
                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">
                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">最大宽度：</span>
                        <button id="${width30}" class="left">30%</button>
                        <button id="${width50}" class="left">50%</button>
                        <button id="${width100}" class="left">100%</button>
                    </div>
                    <div class="w-e-button-container">
                        <button id="${delBtn}" class="gray left">删除图片</button>
                    </dv>
                </div>`,
                events: [
                    {
                        selector: '#' + width30,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '30%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + width50,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '50%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + width100,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '100%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + delBtn,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.remove()
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    }
                ]
            }
        ]

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        })
        panel.show()

        // 记录属性
        this.panel = panel
    },

    _createInsertPanel: function () {
        const editor = this.editor
        const uploadImg = editor.uploadImg
        const config = editor.config

        // id
        const upTriggerId = getRandom('up-trigger')
        const compressImg = getRandom('up-compress') // update by jzc
        const compressCanvas = getRandom('up-canvas') // update by jzc
        const upFileId = getRandom('up-file')
        const linkUrlId = getRandom('link-url')
        const linkBtnId = getRandom('link-btn')

        // tabs 的配置
        const tabsConfig = [
            {
                title: '上传图片',
                tpl: `<div class="w-e-up-img-container">
                    <div>
                      <label class="w-jzc-compress">
                          <input id="${compressImg}" type="checkbox" />
                          Upload original image
                      </label>
                    </div>
                    <div id="${upTriggerId}" class="w-e-up-btn">
                      Upload
                    </div>
                    <canvas style="display:none;" id="${compressCanvas}">
                    </canvas>
                    <div style="display:none;">
                        <input id="${upFileId}" type="file" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>
                    </div>
                </div>`,
                // <i class="w-e-icon-upload2"></i>
                events: [
                    {
                        // 触发选择图片
                        selector: '#' + upTriggerId,
                        type: 'click',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (fileElem) {
                                fileElem.click()
                            } else {
                                // 返回 true 可关闭 panel
                                return true
                            }
                        }
                    },
                    {
                        // 选择是否上传原图 add by jzc
                        selector: '#' + compressImg,
                        type: 'click',
                        fn: () => {
                            const $checkbox = $('#' + compressImg)
                            const checkboxElem = $checkbox[0]
                            if (checkboxElem.checked) {
                                console.log('上传 原图')
                                this._compress = false
                            } else {
                                // 返回 true 可关闭 panel
                                console.log('上传 压缩')
                                this._compress = true
                            }
                        }
                    },
                    {
                        // 选择图片完毕
                        selector: '#' + upFileId,
                        type: 'change',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (!fileElem) {
                                // 返回 true 可关闭 panel
                                return true
                            }
                            
                            // 获取选中的 file 对象列表
                            let fileList = fileElem.files
                            if (fileList.length) {
                                if (this._compress) {
                                    let canvas = $('#' + compressCanvas)[0]
                                    let ctx = canvas.getContext('2d')
                                    // 选择压缩执行
                                    try {
                                        let reader = new FileReader()
                                        let _this = this
                                        let imageName = fileList[0].name
                                        console.log(fileList[0], imageName)
                                        let isPng = /png/gi.test(fileList[0].type)
                                        reader.onload = function(arg) {
                                            let src_image = new _this.editor.oldImage()

                                            src_image.crossOrigin = 'Anonymous' //cors support
                                            src_image.onload = function(){
                                                let img_w = src_image.width
                                                let img_h = src_image.height
                                                canvas.width = img_w
                                                canvas.height = img_h
                                                ctx.clearRect(0, 0, img_w, img_h)
                                                if(!isPng) {
                                                    ctx.fillStyle = '#ffffff'
                                                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                                                }
                                                ctx.drawImage(src_image, 0, 0)
                                                canvas.toBlob(function(blob){
                                                    let newFiles = new File([blob], imageName, {type: 'image/png'})
                                                    // fileList[0] = newFiles
                                                    uploadImg.uploadImg([newFiles])
                                                    console.log(newFiles)
                                                }, isPng ? 'image/png': 'image/jpeg', _this._percentages)
                                            }
                                            src_image.src = this.result
                                        }
                                        reader.readAsDataURL(fileList[0])
                                    } catch (error) {
                                        // 如皋不支持压缩则执行
                                        uploadImg.uploadImg(fileList)
                                    }
                                } else {
                                    // 没选择压缩执行
                                    console.log(fileList[0])
                                    uploadImg.uploadImg(fileList)
                                }
                            }
                            
                            // 返回 true 可关闭 panel
                            return true
                        }
                    }
                ]
            }, // first tab end
            {
                title: '网络图片',
                tpl: `<div>
                    <input id="${linkUrlId}" type="text" class="block" placeholder="图片链接"/></td>
                    <div class="w-e-button-container">
                        <button id="${linkBtnId}" class="right">插入</button>
                    </div>
                </div>`,
                events: [
                    {
                        selector: '#' + linkBtnId,
                        type: 'click',
                        fn: () => {
                            const $linkUrl = $('#' + linkUrlId)
                            const url = $linkUrl.val().trim()

                            if (url) {
                                uploadImg.insertLinkImg(url)
                            }

                            // 返回 true 表示函数执行结束之后关闭 panel
                            return true
                        }
                    }
                ]
            } // second tab end
        ] // tabs end

        // 判断 tabs 的显示
        const tabsConfigResult = []
        if ((config.uploadImgShowBase64 || config.uploadImgServer || config.customUploadImg) && window.FileReader) {
            // 显示“上传图片”
            tabsConfigResult.push(tabsConfig[0])
        }
        if (config.showLinkImg) {
            // 显示“网络图片”
            tabsConfigResult.push(tabsConfig[1])
        }

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfigResult
        })
        panel.show()
        // 初始化压缩选项 add by jzc
        const $checkCompress = $('#' + compressImg)
        const checkCompress = $checkCompress[0]
        checkCompress.checked = !this._compress

        // 记录属性
        this.panel = panel
    },

    // 试图改变 active 状态
    tryChangeActive: function (e) {
        const editor = this.editor
        const $elem = this.$elem
        if (editor._selectedImg) {
            this._active = true
            $elem.addClass('w-e-active')
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
        }
    }
}

export default Image