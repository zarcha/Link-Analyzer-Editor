<script>
    import { Jimp, ResizeStrategy } from 'jimp';
    import FileUtil from '../../lib/FileUtil.js'
    import { publish } from '../../lib/Store.js'

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
        try {
            const image = new Jimp({height: 32, width: 32});
            image.background = 0xFFFFFFFF;

            for (let y = 0; y < 32; y++) {
                for (let x = 0; x < 32; x++) {
                    const bitIndex = y * 32 + x;
                    const byteIndex = Math.floor(bitIndex / 8);
                    const bitPosition = bitIndex % 8; 
                    let bit = 0;

                    if(y < 30){
                        const hexByte = hexString.substr(byteIndex * 2, 2);
                        const byteValue = parseInt(hexByte, 16);
                        const reversedByte = reverseBits(byteValue);

                        bit = (reversedByte >> (7 - bitPosition)) & 1;
                    }else{
                        bit = 0
                    }
                    
                    const color = bit === 0 ? 0xFFFFFFFF : 0x000000FF; 
                    image.setPixelColor(color, x, y);
                }
            }

            rawImage = await image.clone();
            jpegImage = await image.rotate(-90).flip({horizontal: true, vertical: false}).resize({w: 160, h: 160, mode: ResizeStrategy.NEAREST_NEIGHBOR}).getBase64('image/bmp');
        }catch(error){
            console.error(error);
            publish('toasts', {type: 'error', content: `Error occured when converting [${name}]`});
        }
    }

    async function uploadSprite() {
        try{
            const tmp = await FileUtil.openImage();
            if(tmp){
                value = tmp;
                publish('toasts', {type: 'success', content: `New [${name}] sprite uploaded.`});
            }
        }catch(error){
            publish('toasts', {type: 'error', content: error.message || error});
        }
    }

    async function saveSprite(format){
        try{
            const fileName = await FileUtil.saveImage(name, rawImage.clone(), format);
            if(fileName){
                publish('toasts', {type: 'success', content: `[${name}] sprite downloaded as ${fileName}`});
            }
        }catch(error){
            publish('toasts', {type: 'error', content: error.message || error});
        }
    }

    $effect(() => {
        createImageFromHex(value);
    });
</script>

<div style="card pad-bottom">
    <div class="card-header align-center">{name}</div>
    <div class="card-body align-center">
        {#if jpegImage}
        <div class="margin-bottom">
            <img src="{jpegImage}" alt="Not Avalible"/>
        </div>
        <div>
            <button type="button" class="btn btn-warning margin-bottom" onclick={uploadSprite}>Upload</button>
            <button type="button" class="btn btn-warning margin-bottom" onclick={() => saveSprite('bmp')}>Save BMP</button>
        </div>
        {/if}
    </div>
</div>

<style>
    .align-center {
        text-align: center;
    }

    .margin-bottom {
        padding-bottom: 10px;
    }
</style>