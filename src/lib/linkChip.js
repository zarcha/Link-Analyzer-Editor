import { hex2int, int2hex } from './util.js';

const locations = {
    naviId: {
        start: 0,
        length: 1,
        type: 'int',
        little: false,
        multiplier: 1,
    },
    petId: {
        start: 2,
        length: 2,
        type: 'int',
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
        type: 'int',
        little: false,
        multiplier: 1,
    },
    experience: {
        start: 10,
        length: 2,
        type: 'int',
        little: true,
        multiplier: 1,
    },
    health: {
        start: 12,
        length: 1,
        type: 'int',
        little: false,
        multiplier: 10,
    },
    attack: {
        start: 13,
        length: 1,
        type: 'int',
        little: false,
        multiplier: 1,
    },
    wins: {
        start: 16,
        length: 1,
        type: 'int',
        little: false,
        multiplier: 1,
    },
    losses: {
        start: 17,
        length: 1,
        type: 'int',
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
        petId: getIntValue('petId', raw),
        owner: getIntValue('owner', raw),
        naviId: getIntValue('naviId', raw),
        level: getIntValue('level', raw),
        experience: getIntValue('experience', raw),
        health: getIntValue('health', raw),
        attack: getIntValue('attack', raw),
        wins: getIntValue('wins', raw),
        losses: getIntValue('losses', raw),
        beastOutSprite: getRawValue('beastOutSprite', raw),
        crossSprite: getRawValue('crossSprite', raw),
        loseSprite: getRawValue('loseSprite', raw),
        winSprite: getRawValue('winSprite', raw),
        raw,
    };

    return tmp;
}

function toRaw(object) {
    const keys = Object.keys(object);

    keys.forEach((key) => {
        if (key != 'raw' && locations[key].type == 'int') {
            const maxValue = locations[key].length == 1 ? 255 : 65535;
            if (object[key] > maxValue || object[key] < 0) {
                throw new Error(`Field [${key}] contains invalid data.`);
            }

            const tmp = object[key] / locations[key].multiplier;
            object.raw = setRawValue(key, int2hex(tmp, locations[key].little), object.raw);
        } else if (key != 'raw' && locations[key].type == 'image') {
            object.raw = setRawValue(key, object[key], object.raw);
        }
    });

    return object;
}

function getIntValue(field, raw) {
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

function replaceAt(source, start, end, replacement) {
    return source.substring(0, start) + replacement + source.substring(start + replacement.length, source.length);
}

export default { toObject, toRaw, pinoutToBin };
