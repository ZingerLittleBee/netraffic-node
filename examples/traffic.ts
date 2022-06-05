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

setInterval(() => {
    let { total } = traffic.getData(rule)
    if (total > 1000 * 1000 * 1000) {
        console.log(`${total / (1000 * 1000 * 1000)} GB`)
    } else if (total > 1000 * 1000) {
        console.log(`${total / (1000 * 1000)} MB`)
    } else if (total > 1000) {
        console.log(`${total / 1000} KB`)
    } else {
        console.log(`${total} B`)
    }
}, 1000)
