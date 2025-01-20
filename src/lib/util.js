function hex2int(hex){
    return parseInt(hex, 16);
}

function int2hex(int){
    return ("00" + (int).toString(16)).substr(-2)
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export {hex2int, int2hex, delay}