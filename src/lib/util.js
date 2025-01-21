// function hex2int(value){
//     return parseInt(value, 16);
// }

function hex2int(hex, isLittleEndian = false) {
    if (typeof hex !== "string" || !/^[0-9A-Fa-f]+$/.test(hex)) {
        throw new Error("Input must be a valid hexadecimal string.");
    }

    // Ensure the hex string is even-length
    if (hex.length % 2 !== 0) {
        throw new Error("Hexadecimal string length must be even.");
    }

    if (isLittleEndian) {
        // Split into bytes, reverse the order, and join
        const bytes = hex.match(/.{2}/g).reverse();
        hex = bytes.join("");
    }

    // Convert the hexadecimal string to an integer
    return parseInt(hex, 16);
}

// function int2hex(int){
//     return ("00" + (int).toString(16)).substr(-2).toUpperCase();
// }

function int2hex(value, isLittleEndian = false){
    if (!Number.isInteger(value)) {
        throw new Error("Input must be an integer.");
    }

    if (value < 0) {
        throw new Error("This function does not support negative numbers for endianness conversion.");
    }

    // Convert the integer to a hexadecimal string
    let hex = value.toString(16).toUpperCase();

    // Ensure the hex string is even-length (divisible by 2)
    if (hex.length % 2 !== 0) {
        hex = "0" + hex;
    }

    if (isLittleEndian) {
        // Split into bytes (pairs of two characters), reverse, and join
        const bytes = hex.match(/.{2}/g).reverse();
        hex = bytes.join("");
    }

    return hex;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export {hex2int, int2hex, delay}