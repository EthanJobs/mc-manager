
// 标签顺序id
let Tag_auto_id = 0

const hex2int = (hexStr) => {
    const num = parseInt(hexStr, 16)
    if ((num & parseInt('80000000', 16)) !== 0)
        return num - parseInt('1' + '0'.repeat(hexStr.length), 16)
    return num
}

export const int2hex = (num) => {
    if ((num & parseInt('80000000', 16)) !== 0)
        return (num + parseInt('100000000', 16)).toString(16)
    return num.toString(16)
}

// 标签接口
const Tag = ({ name, load_size, load_member_size, id = Tag_auto_id++, load_name_size = 2, getValue = () => { } }) => {
    return { name, load_size, load_member_size, id, load_name_size, getValue }
}

const parseInt16 = (nbtData, tag) => {
    return hex2int(getStr(nbtData, tag.load_size).join(''))
}

const parseFloat16 = (nbtData, tag) => {
    // 创建一个ArrayBuffer，长度为4字节（float）
    let buffer = new ArrayBuffer(4);

    // 通过Float32Array视图解析ArrayBuffer
    let floatArray = new Float32Array(buffer);

    // 将整数存入ArrayBuffer
    let uintArray = new Uint32Array(buffer);
    uintArray[0] = parseInt16(nbtData, tag);

    // 读取TypedArray中的值
    let floatValue = floatArray[0];

    return floatValue;
}

const parseDouble16 = (nbtData, tag) => {
    // 创建一个ArrayBuffer，长度为8字节（double）
    let buffer = new ArrayBuffer(8);

    // 通过Float64Array视图解析ArrayBuffer
    let doubleArray = new Float64Array(buffer);

    // 将整数存入ArrayBuffer
    let uintArray = new BigUint64Array(buffer);
    uintArray[0] = BigInt(parseInt16(nbtData, tag));

    // 读取TypedArray中的值
    let doubleValue = doubleArray[0];

    return doubleValue;
}

const parseArray = (nbtData, tag) => {
    let arrayLen = parseInt(getStr(nbtData, tag.load_size).join(''), 16)
    let value = []
    for (let i = 0; i < arrayLen; i++)
        value.push(hex2int(getStr(nbtData, tag.load_member_size).join('')))
    return { arrayLen, value }
}

// 所有标签类型
const NBT_TAG_FORMAT = [
    Tag({
        name: 'TAG_End',
        load_size: 0,
        load_name_size: 0
    }),
    Tag({
        name: 'TAG_Byte',
        load_size: 1,
        getValue: parseInt16
    }),
    Tag({
        name: 'TAG_Short',
        load_size: 2,
        getValue: parseInt16
    }),
    Tag({
        name: 'TAG_Int',
        load_size: 4,
        getValue: parseInt16
    }),
    Tag({
        name: 'TAG_Long',
        load_size: 8,
        getValue: parseInt16
    }),
    Tag({
        name: 'TAG_Float',
        load_size: 4,
        getValue: parseFloat16
    }),
    Tag({
        name: 'TAG_Double',
        load_size: 8,
        getValue: parseDouble16
    }),
    Tag({
        name: 'TAG_Byte_Array',
        load_size: 4,
        load_member_size: 1,
        getValue: parseArray
    }),
    Tag({
        name: 'TAG_String',
        load_size: 2,
        getValue: (nbtData) => {
            let valueLen = getNameLen(nbtData, 2)
            let value = getNameValue(nbtData, valueLen)
            return value
        }
    }),
    Tag({
        name: 'TAG_List',
        load_size: 4,
        getValue: (nbtData, tag) => {
            let listTag = getTag(nbtData)
            let ListLen = parseInt(getStr(nbtData, tag.load_size).join(''), 16)
            let value = []
            for (let i = 0; i < ListLen; i++)
                value.push(listTag.getValue(nbtData, listTag))
            return { value }
        }
    }),
    Tag({
        name: 'TAG_Compound',
        load_size: 0,
        getValue: (nbtData) => {
            let obj = {}
            while (true) {
                let data = nbtData.next()
                // 0 为 TAG_END
                if (data.tag.id === 0) break
                obj[data.name] = data.value
            }
            return obj
        }
    }),
    Tag({
        name: 'TAG_Int_Array',
        load_size: 4,
        load_member_size: 4,
        getValue: parseArray
    }),
    Tag({
        name: 'TAG_Long_Array',
        load_size: 4,
        load_member_size: 8,
        getValue: parseArray
    }),
]

/* nbtData私有函数 */

// 获取nbtData接下来的某段值
const getStr = (nbtData, load_size) => {
    const str = nbtData.data.slice(nbtData.index, nbtData.index + load_size)
    nbtData.index += load_size
    return str
}

const getTag = nbtData => {
    return NBT_TAG_FORMAT[parseInt(getStr(nbtData, 1), 16)]
}

const getNameLen = (nbtData, load_name_size) => {
    if (load_name_size <= 0) return 0
    return parseInt(getStr(nbtData, load_name_size).join(''), 16)
}

const getNameValue = (nbtData, nameValLen) => {
    return getStr(nbtData, nameValLen).map(e => String.fromCharCode(parseInt(e, 16))).join('')
}

// 简单迭代器接口
class nbtIterator {
    constructor(data) {
        this.data = data
        this.index = 0
    }

    hasNext = () => {
        return this.index < this.data.length
    }

    next = () => {
        let tag = getTag(this)
        let nameLen = getNameLen(this, tag.load_name_size)
        let name = getNameValue(this, nameLen)
        let value = tag.getValue(this, tag)

        // console.log({ tag: tag.name, nameLen, name, value })

        // console.log(this.index, this.data.length)

        return { tag, name, value };
    }
}

export class nbtData {
    constructor(data) {
        this.data = data
    }

    parse = () => {
        let { tag, name, value } = new nbtIterator(this.data).next()

        return { name, value }
    }
}