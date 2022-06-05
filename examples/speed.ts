import { getDefaultDevice, Traffic } from '../index'

const traffic = new Traffic()

let device = getDefaultDevice()

// BPF: https://biot.com/capstats/bpf.html
// Examples
// - `port 5000`
// - `tcp port 5000`
// - `src 127.0.0.1`
// - `dst 127.0.0.1`
let rule = ''

traffic.addListener(device, rule)

let preTotal = 0

setInterval(() => {
    let { total } = traffic.getData(rule)
    let current = total - preTotal
    preTotal = total
    if (current > 1000 * 1000 * 1000) {
        console.log(`${total / (1000 * 1000 * 1000)} GB/s`)
    } else if (current > 1000 * 1000) {
        console.log(`${current / (1000 * 1000)} MB/s`)
    } else if (current > 1000) {
        console.log(`${current / 1000} KB/s`)
    } else {
        console.log(`${current} B/s`)
    }
}, 1000)
