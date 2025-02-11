import { Jimp, ResizeStrategy } from 'jimp';
import { bin2hex, flipEndainess } from './util';

function reverseBits(byte) {
    let reversed = 0;
    for (let i = 0; i < 8; i++) {
        reversed = (reversed << 1) | (byte & 1);
        byte >>= 1;
    }
    return reversed;
}

async function createImageFromHex(hexString) {
    const image = new Jimp({ height: 32, width: 32 });
    image.background = 0xffffffff;

    for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 32; x++) {
            const bitIndex = y * 32 + x;
            const byteIndex = Math.floor(bitIndex / 8);
            const bitPosition = bitIndex % 8;
            let bit = 0;

            if (y < 30) {
                const hexByte = hexString.substr(byteIndex * 2, 2);
                const byteValue = parseInt(hexByte, 16);
                const reversedByte = reverseBits(byteValue);

                bit = (reversedByte >> (7 - bitPosition)) & 1;
            } else {
                bit = 0;
            }

            const color = bit === 0 ? 0xffffffff : 0x000000ff;
            image.setPixelColor(color, x, y);
        }
    }

    return {
        rawImage: await image.clone(),
        dispalyImg: await image
            .rotate(-90)
            .flip({ horizontal: true, vertical: false })
            .resize({ w: 160, h: 160, mode: ResizeStrategy.NEAREST_NEIGHBOR })
            .getBase64('image/bmp'),
    };
}

async function createHexFromImage(arrayBuffer) {
    const image = await Jimp.fromBuffer(arrayBuffer);

    if (image.bitmap.width != 32 || image.bitmap.height != 32) {
        throw new Error('Image must be 32x32.');
    }

    await image.greyscale().flip({ horizontal: true, vertical: false }).rotate(90);
    const bmpData = image.bitmap.data.toString('HEX');
    let currentBin = '';
    let hex = '';

    for (let i = 0; i < bmpData.length; i += 8) {
        currentBin += bmpData.substring(i, i + 8) == 'fefefeff' ? 0 : 1;

        if (currentBin.length == 8) {
            hex += bin2hex(flipEndainess(currentBin));
            currentBin = '';
        }
    }

    return hex.substring(0, 240);
}

export default { createHexFromImage, createImageFromHex };
