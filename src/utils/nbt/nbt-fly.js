import Pako from "pako"
import { nbtData } from './nbt-config'

const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
        // 创建一个新的 FileReader 对象
        const reader = new FileReader()
        // 读取 File 对象
        reader.readAsDataURL(file)
        // 加载完成后
        reader.onload = function () {
            // 将读取的数据转换为 base64 编码的字符串
            const base64String = reader.result.split(',')[1]
            // 解析为 Promise 对象，并返回 base64 编码的字符串
            resolve(base64String)
        }

        // 加载失败时
        reader.onerror = function () {
            reject(new Error('Failed to load file'))
        }
    })
}

const byteArrayToHexString = byteArray => {
    return Array.from(byteArray, byte => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    });
}

const unzip = b64Data => {
    var strData = atob(b64Data)
    // 将二进制字符串转换为字符数数组
    var charData = strData.split('').map(function (x) {
        return x.charCodeAt(0)
    })
    // 把数字数组转换成字节数组
    var binData = new Uint8Array(charData)
    // 解压
    var data = Pako.inflate(binData)

    return byteArrayToHexString(data)
}

export const nbtParseByFile = async file => {
    const b64Data = await fileToBase64(file)
    const gzData = unzip(b64Data)
    return new nbtData(gzData).parse()
}

export const nbtParseByBase64 = async b64Data => {
    const gzData = unzip(b64Data)
    return new nbtData(gzData).parse()
}