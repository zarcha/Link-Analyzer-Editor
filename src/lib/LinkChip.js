import { hex2int, int2hex } from './util.js'

let navi;

let locations = {
    naviId: {
        start: 0,
        length: 1,
        type: "int",
        little: false,
        multiplier: 1
    },
    petId: {
        start: 2,
        length: 2,
        type: "int",
        little: false,
        multiplier: 1
    },
    owner: {
        start: 4,
        length: 5,
        type: "int",
        little: false,
        multiplier: 1
    },
    level: {
        start: 9,
        length: 1,
        type: "int",
        little: false,
        multiplier: 1
    },
    experiance: {
        start: 10,
        length: 2,
        type: "int",
        little: true,
        multiplier: 1
    },
    health: {
        start: 12,
        length: 1,
        type: "int",
        little: false,
        multiplier: 10
    },
    attack: {
        start: 13,
        length: 1,
        type: "int",
        little: false,
        multiplier: 1
    },
    wins: {
        start: 16,
        length: 1,
        type: "int",
        little: false,
        multiplier: 1
    },
    losses: {
        start: 17,
        length: 1,
        type: "int",
        little: false,
        multiplier: 1
    },
    unkownSprite: {
        start: 228,
        length: 122,
        type: "image"
    },
    crossSprite: {
        start: 356,
        length: 122,
        type: "image"
    },
    loseSprite: {
        start: 484,
        length: 122,
        type: "image"
    },
    winSprite: {
        start: 612,
        length: 122,
        type: "image"
    }
}

function toObject(raw){
    let tmp = {
        petId: getIntValue("petId", raw),
        owner: getIntValue("owner", raw),
        naviId: getIntValue("naviId", raw),
        level: getIntValue("level", raw),
        experiance: getIntValue("experiance", raw),
        health: getIntValue("health", raw),
        attack: getIntValue("attack", raw),
        wins: getIntValue("wins", raw),
        losses: getIntValue("losses", raw),
        crossSprite: getRawValue("crossSprite", raw),
        loseSprite: getRawValue("loseSprite", raw),
        winSprite: getRawValue("winSprite", raw),
        raw: raw
    }

    return tmp;
}

function toRaw(object){
    const keys = Object.keys(object);

    keys.forEach((key) => {
        if(key != "raw" && locations[key].type == "int"){
            let tmp = object[key] / locations[key].multiplier;
            object.raw = setRawValue(key, int2hex(tmp, locations[key].little) , object.raw);
        }else if(key != "raw" && locations[key].type == "image"){
            object.raw = setRawValue(key, object[key], object.raw);
        }
    });

    return object;
}

function getIntValue(field, raw){
    return hex2int(getRawValue(field, raw), locations[field].little) * locations[field].multiplier;
}

function getRawValue(field, raw){
    return raw.substr(locations[field].start * 2, locations[field].length * 2)
}

function setRawValue(field, value, raw){
    return raw.replaceAt(locations[field].start * 2, (locations[field].start * 2) + (locations[field].length * 2), value);
}

function pinoutToBin(pinout) {
    return pinout.substring(2).slice(0, -1).split("").reverse().join("").padStart(16, '0');
}

String.prototype.replaceAt = function(start, end, replacement){
    return this.substring(0, start) + replacement + this.substring(start + replacement.length, this.length);
}

export default { toObject, toRaw, pinoutToBin }