<script>
    import { Jimp } from "jimp";
    let {name, value = $bindable()} = $props();
    let jpegImage = $state();
    let rawImage;

    function reverseBits(byte) {
        let reversed = 0;
        for (let i = 0; i < 8; i++) {
            reversed = (reversed << 1) | (byte & 1);
            byte >>= 1;
        }
        return reversed;
    }

    async function createImageFromHex(hexString) {
        let image = new Jimp({height: 32, width: 32});
        image.background = 0xFFFFFFFF;

        for (let y = 0; y < 32; y++) {
            for (let x = 0; x < 32; x++) {
                const bitIndex = y * 32 + x;
                const byteIndex = Math.floor(bitIndex / 8);
                const bitPosition = bitIndex % 8; 
                let bit = 0;

                if(y < 30 && x < 30){
                const hexByte = hexString.substr(byteIndex * 2, 2);
                const byteValue = parseInt(hexByte, 16);
                const reversedByte = reverseBits(byteValue);

                bit = (reversedByte >> (7 - bitPosition)) & 1;
                }else{
                    bit = 1
                }
                
                const color = bit === 0 ? 0xFFFFFFFF : 0x000000FF; 
                image.setPixelColor(color, x, y);
            }
        }

        rawImage = await image.clone();
        jpegImage = await image.rotate(-90).flip({horizontal: true, vertical: false}).resize({w: 160, h: 160}).getBase64("image/jpeg");
    }

    async function saveImageToFile(image, format) {
        try {
            // Show the save file picker
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: `${name.split(" ").join("-")}.${format}`,
                types: [
                    {
                        description: `${format.toUpperCase()} Image`,
                        accept: { [`image/${format}`]: [`.${format}`] },
                    },
                ],
            });

            // Create a writable stream
            const writable = await fileHandle.createWritable();

            await image.rotate(-90).flip({horizontal: true, vertical: false});

            // Get the image buffer in the specified format
            if(format != "bmp"){
                await image.resize({w: 160, h: 160});
            }
            const imageBuffer = await image.getBuffer(`image/${format}`);

            // Write the image buffer to the file
            await writable.write(imageBuffer);

            // Close the writable stream
            await writable.close();

            console.log(`Image saved successfully as ${format.toUpperCase()}!`);
        } catch (err) {
            console.error('Error saving the image:', err);
        }
    }

    function flipEndainess(str){
        return str.split("").reverse().join("")
    }

    value && createImageFromHex(value);
</script>

<div style="card pad-bottom">
    <div class="card-header align-center">{name}</div>
    <div class="card-body align-center">
        {#if jpegImage}
        <div class="pad-bottom">
            <img src="{jpegImage}" />
        </div>
        <div class="pad-bottom">
            <button type="button" class="btn btn-warning" on:click={() => saveImageToFile(rawImage.clone(), "jpeg")}>Save JPEG</button>
            <button type="button" class="btn btn-warning" on:click={() => saveImageToFile(rawImage.clone(), "bmp")}>Save BMP</button>
        </div>
        <div>
            <button type="button" class="btn btn-warning">Upload</button>
        </div>
        {/if}
    </div>
</div>

<style>
    .align-center {
        text-align: center;
    }

    .pad-bottom {
        padding-bottom: 10px;
    }
</style>