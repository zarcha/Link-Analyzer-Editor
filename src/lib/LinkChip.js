function pinoutToBin(pinout) {
    return pinout.substr(2).slice(0, -1).split("").reverse().join("").padStart(16, '0');
}

export { pinoutToBin }