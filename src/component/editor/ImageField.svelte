<script>
    import FileUtil from '../../lib/FileUtil.js'
    import imgUtil from '../../lib/imgUtil.js';
    import { publish } from '../../lib/Store.js'

    let {name, value = $bindable()} = $props();
    let dispalyImg = $state();
    let rawImage = $state();

    async function setImage(){
        const tmp = await imgUtil.createImageFromHex(value);
        rawImage = tmp.rawImage;
        dispalyImg = tmp.dispalyImg;
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
        setImage();
    });
</script>

<div class="card margin-bottom">
    <div class="card-header align-center">{name}</div>
    <div class="card-body align-center">
    <div class="margin-bottom">
        <img src="{dispalyImg}" alt="Not Avalible"/>
    </div>
    <div>
        <button type="button" class="btn btn-warning margin-bottom" onclick={uploadSprite}>Upload</button>
        <button type="button" class="btn btn-warning margin-bottom" onclick={() => saveSprite('bmp')}>Save BMP</button>
    </div>
    </div>
</div>

<style>
    .align-center {
        text-align: center;
    }

    .margin-bottom {
        margin-bottom: 10px;
    }
</style>