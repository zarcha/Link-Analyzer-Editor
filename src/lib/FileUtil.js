import { int2hex, bin2hex, flipEndainess } from './util';
import LinkChip from './LinkChip';
import { Jimp } from 'jimp';

async function saveNavi(navi) {
    try {
        navi = LinkChip.toRaw(navi);
        const hexArray = new Uint8Array(navi.raw.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'backup.navi',
            types: [
                {
                    description: 'Navi Backup',
                    accept: { 'application/octet-stream': ['.navi'] },
                },
            ],
        });

        const writableStream = await fileHandle.createWritable();

        await writableStream.write(hexArray);
        await writableStream.close();
        return fileHandle.name;
    } catch (error) {
        if (!error.message.toLowerCase().includes('window')) {
            throw new Error(error);
        }
    }
}

async function openNavi() {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Navi Backup',
                    accept: { 'application/octet-stream': ['.navi'] },
                },
            ],
            multiple: false,
        });

        const file = await fileHandle.getFile();
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        let out = '';

        if (uint8Array.length != 1024) {
            throw new Error('Navi file has an incorrect length.');
        }

        for (let i = 0; i < uint8Array.length; i++) {
            out += int2hex(uint8Array[i]);
        }

        return LinkChip.toObject(out);
    } catch (error) {
        if (!error.message.includes('Window')) {
            throw new Error(error);
        }
    }
}

async function saveImage(name, image, format) {
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: `${name.split(' ').join('-')}.${format}`,
            types: [
                {
                    description: `${format.toUpperCase()} Image`,
                    accept: { [`image/${format}`]: [`.${format}`] },
                },
            ],
        });

        const writable = await fileHandle.createWritable();

        await image.rotate(-90).flip({ horizontal: true, vertical: false });

        if (format != 'bmp') {
            await image.resize({ w: 160, h: 160 });
        }
        const imageBuffer = await image.getBuffer(`image/${format}`);

        await writable.write(imageBuffer);
        await writable.close();
        return fileHandle.name;
    } catch (error) {
        if (!error.message.includes('Window')) {
            throw new Error(error);
        }
    }
}

async function openImage() {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Bitmap Files',
                    accept: { 'image/bmp': ['.bmp'] },
                },
            ],
            multiple: false,
        });

        const file = await fileHandle.getFile();
        const arrayBuffer = await file.arrayBuffer();
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
    } catch (error) {
        if (!error.message.includes('Window')) {
            throw new Error(error);
        }
    }
}

export default { saveImage, openImage, saveNavi, openNavi };
