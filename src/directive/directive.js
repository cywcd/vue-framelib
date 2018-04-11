/**
 * Created by caoyingwen on 2018/1/25.
 */
import Vue from 'vue'

const title = Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      let iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      let iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 500)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  }
})

export {title}
