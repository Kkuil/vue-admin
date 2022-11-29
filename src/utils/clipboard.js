import Vue from 'vue'
import Clipboard from 'clipboard'

function success() {
    Vue.prototype.$message({
        type: 'success',
        message: '复制成功',
        duration: 1500
    })
}

function error() {
    Vue.prototype.$message({
        type: 'error',
        message: '复制失败',
        duration: 1500
    })
}

export default function clip(event, data) {
    const clipboard = new Clipboard(event, {
        text: () => data
    })
    clipboard.on('success', () => {
        success()
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        error()
        clipboard.destroy()
    })
}