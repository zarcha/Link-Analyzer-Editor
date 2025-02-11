<script>
    import axios from 'axios';
    // eslint-disable-next-line 
    import { Buffer } from 'buffer'; 

    let { chipInfo = $bindable() } = $props();

    async function getImage() {
        const noDataImage = 'images/no-data.png';

        try{
            const res = await axios.get(`images/chips-hi-rez/${chipInfo.id}.png`, {
                responseType: 'arraybuffer',
            });

            if(res.headers['content-type'] == 'image/png'){
                const base64 = Buffer.from(res.data, 'binary').toString('base64');
                const base64Image = `data:image/png;base64,${base64}`;
                chipInfo.chipArt = base64Image;
            }else{
                chipInfo.chipArt = noDataImage;
            }
        }catch(error){
            console.error(error);
            chipInfo.chipArt = noDataImage;
        }
        

        try{
            const res = await axios.get(`images/chips-attack-pattern/${chipInfo.id}.png`, {
                responseType: 'arraybuffer',
            });
            
            if(res.headers['content-type'] == 'image/png'){
                const base64 = Buffer.from(res.data, 'binary').toString('base64');
                const base64Image = `data:image/png;base64,${base64}`;
                chipInfo.attackArt = base64Image;
            }else{
                chipInfo.attackArt = noDataImage;
            }
        }catch(error){
            console.error(error);
            chipInfo.attackArt = noDataImage;
        }
        
    }

    $effect(() => {
        getImage();
    });

</script>

<div class="card chip">
    <div class="card-header">
        <div class="id-container">
            <span>ID -</span><span class="id">{chipInfo.id}</span>
        </div>
        <div class="name-container">{chipInfo.name.toUpperCase()}</div>
        <div class="class-container">
            <span>{chipInfo.class}</span>
        </div>
    </div>
    <div class="card-body">
        <div class="image-container card">
            <div class="card-header">Chip Art</div>
            <div class="card-body">
                <img src={chipInfo.chipArt} alt="No Art"/>
            </div>
        </div>
        <div class="image-container card">
            <div class="card-header">Attack Pattern</div>
            <div class="card-body">
                 <img src={chipInfo.attackArt} alt="No Art"/>
            </div>
        </div>
        <div class="info-container">
            <div>
                <span class="title">PET</span>
                <hr>
                {#if chipInfo.pet.type}
                <div class="input-group">
                    <span class="input-group-text">TYPE</span>
                    <span class="form-control">{chipInfo.pet.type}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.pet.damage > 0}
                <div class="input-group">
                    <span class="input-group-text">DAMAGE</span>
                    <span class="form-control">{chipInfo.pet.damage}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.pet.affect}
                <div class="card">
                    <div class="card-header">AFFECT</div>
                    <div class="card-body">{chipInfo.pet.affect}</div>
                </div>
                {/if}
                {#if !chipInfo.pet.type && chipInfo.pet.damage == 0 && !chipInfo.pet.affect}
                    <span>No Data</span>
                {/if}
            </div>
            <br>
            <div>
                <span class="title">ARCADE</span>
                <hr>
                {#if chipInfo.bcs.type}
                <div class="input-group">
                    <span class="input-group-text">TYPE</span>
                    <span class="form-control">{chipInfo.bcs.type}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.bcs.damage > 0}
                <div class="input-group">
                    <span class="input-group-text">DAMAGE</span>
                    <span class="form-control">{chipInfo.bcs.damage}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.bcs.affect}
                    <div class="card">
                        <div class="card-header">AFFECT</div>
                        <div class="card-body">{chipInfo.bcs.affect}</div>
                    </div>
                {/if}
                {#if !chipInfo.bcs.type && chipInfo.bcs.damage == 0 && !chipInfo.bcs.affect}
                    <span>No Data</span>
                {/if}
            </div>
            <br>
            <div>
                <span class="title">GBA</span>
                <hr>
                {#if chipInfo.gba.type}
                <div class="input-group">
                    <span class="input-group-text">TYPE</span>
                    <span class="form-control">{chipInfo.gba.type}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.gba.damage > 0}
                <div class="input-group">
                    <span class="input-group-text">DAMAGE</span>
                    <span class="form-control">{chipInfo.gba.damage}</span>
                </div>
                <br>
                {/if}
                {#if chipInfo.gba.affect}
                    <div class="card">
                        <div class="card-header">AFFECT</div>
                        <div class="card-body">{chipInfo.gba.affect}</div>
                    </div>
                {/if}
                {#if !chipInfo.gba.type && chipInfo.gba.damage == 0 && !chipInfo.gba.affect}
                    <span>No Data</span>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .chip {
        margin-bottom: 10px;
    }

    .id-container {
        display: inline-block;
        background-color: gray;
        width: 150px;
        border-radius: 0px 10px 10px 0px;
        padding-left: 10px;
        padding-right: 10px;
        color: black;
        margin-right: 10px;
    }

    .id {
        float: right;
    }

    .name-container {
        display: inline-block;
        font-weight: bold;
    }

    .class-container {
        display: inline-block;
        background-color: gray;
        color: black;
        float: right;
        border-radius: 10px;
        width: 150px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
    }

    .image-container {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        vertical-align: middle;
        
        .card-header {
            text-align: center;
            font-weight: bold;
        }

        img {
            width: 150px;
            border-radius: 15px;
            border: 2px solid rgba(222, 226, 230, 1);
        }
    }

    .info-container {
        margin-right: 10px;
        display: inline-block; 
        vertical-align: middle;
        width: 500px;

        .title {
            font-weight: bold;
        }
    }
</style>