import { getDefaultDevice, getDevice } from '../index'

let defaultDevice = getDefaultDevice()

let devices = getDevice()

console.log(`defaultDevice: ${defaultDevice}`)
console.log(`devices: ${devices}`)
