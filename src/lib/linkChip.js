import { hex2int, int2hex } from './util.js';

const locations = {
    naviId: {
        start: 0,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    petId: {
        start: 2,
        length: 2,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    owner: {
        start: 4,
        length: 5,
        type: 'string',
        little: false,
        multiplier: 1,
    },
    level: {
        start: 9,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    experience: {
        start: 10,
        length: 2,
        type: 'num',
        little: true,
        multiplier: 1,
    },
    health: {
        start: 12,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 10,
    },
    attack: {
        start: 13,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    wins: {
        start: 16,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    losses: {
        start: 17,
        length: 1,
        type: 'num',
        little: false,
        multiplier: 1,
    },
    beastOutSprite: {
        start: 228,
        length: 120,
        type: 'image',
    },
    crossSprite: {
        start: 356,
        length: 120,
        type: 'image',
    },
    loseSprite: {
        start: 484,
        length: 120,
        type: 'image',
    },
    winSprite: {
        start: 612,
        length: 120,
        type: 'image',
    },
};

function toObject(raw) {
    const tmp = {
        petId: fromRaw('petId', raw),
        owner: fromRaw('owner', raw),
        naviId: fromRaw('naviId', raw),
        level: fromRaw('level', raw),
        experience: fromRaw('experience', raw),
        health: fromRaw('health', raw),
        attack: fromRaw('attack', raw),
        wins: fromRaw('wins', raw),
        losses: fromRaw('losses', raw),
        beastOutSprite: fromRaw('beastOutSprite', raw),
        crossSprite: fromRaw('crossSprite', raw),
        loseSprite: fromRaw('loseSprite', raw),
        winSprite: fromRaw('winSprite', raw),
        raw,
    };

    return tmp;
}

function fromRaw(field, raw) {
    switch (locations[field].type) {
        case 'num':
            return {
                value: getNumValue(field, raw),
                maxValue: getMaxValue(locations[field].length) * locations[field].multiplier,
                multiplier: locations[field].multiplier,
            };
        case 'string':
        case 'image':
            return getRawValue(field, raw);
    }
}

function toRaw(object) {
    const keys = Object.keys(object);

    keys.forEach((key) => {
        if (key !== 'raw' && locations[key].type === 'num') {
            if (object[key].value > object[key].maxValue || object[key].value < 0) {
                throw new Error(`Field [${key}] contains invalid data.`);
            }

            const tmp = object[key].value / locations[key].multiplier;
            object.raw = setRawValue(key, int2hex(tmp, locations[key].little), object.raw);
        } else if (key !== 'raw' && locations[key].type === 'image') {
            object.raw = setRawValue(key, object[key], object.raw);
        }
    });

    return object;
}

function getNumValue(field, raw) {
    return hex2int(getRawValue(field, raw), locations[field].little) * locations[field].multiplier;
}

function getRawValue(field, raw) {
    return raw.substr(locations[field].start * 2, locations[field].length * 2);
}

function setRawValue(field, value, raw) {
    return replaceAt(raw, locations[field].start * 2, locations[field].start * 2 + locations[field].length * 2, value);
}

function pinoutToBin(pinout) {
    return pinout.substring(2).slice(0, -1).split('').reverse().join('').padStart(16, '0');
}

function getMaxValue(bytes, isSigned = false) {
    const bits = bytes * 8;
    return isSigned ? 2 ** (bits - 1) - 1 : 2 ** bits - 1;
}

function replaceAt(source, start, end, replacement) {
    return source.substring(0, start) + replacement + source.substring(start + replacement.length, source.length);
}

export default { toObject, toRaw, pinoutToBin };
