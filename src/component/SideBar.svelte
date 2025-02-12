<script>
    import { delay } from '../lib/util.js';
    import LinkAnalyzer from '../lib/linkAnalyzer.js';
    import { publish } from '../lib/store.js'

    let {port = $bindable(), page = $bindable()} = $props();
    let connecting = $state(false);

    async function connect(){
        if(!('serial' in navigator)){
            publish('toasts', {type: 'error', content: 'Device is not compatible in this browser. Use Chrome, Edge, or Opera.'});
            return
        }
        
        if(!port){
            try{
                connecting = true;

                const tmpPort = await LinkAnalyzer.connect();
                await delay(2000);
                port = tmpPort;

                //When disconnected physically, tell the app.
                port.addEventListener('disconnect', () => {
                    connect();
                });

                publish('toasts', {type: 'success', content: 'Connected to Link Analyzer.'});
            }catch(error){
                console.error(error);
                publish('toasts', {type: 'error', content: 'No selection made or resource is busy.'});
            }
        }else{
            port.close();
            port = null;
            publish('toasts', {type: 'warning', content: 'Link Analyzer has disconnected.'});
        }
        connecting = false;
    }
</script>

<div class="d-flex flex-column flex-shrink-0">
    <a href="." class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img class="logo" src="images/icon.png" alt="Link Analyzer"/>
        <span>Link Analyzer</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" class="nav-link text-black link-cursor {port ? 'bg-success' : 'bg-danger'}" style="text-align: center;" onclick={connect} title="{!port ? 'Connect Link Analyzer' : 'Disconnect Link Analyzer'}">
            {#if !port && !connecting}
            Connect
            {:else if connecting}
            <span class="spinner-border spinner-border-sm" role="status"></span>
            {:else}
            Disconnect
            {/if}
        </a>
    </ul>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="nav-link link-cursor {page == 'library' ? 'text-warning' : 'bg-warning text-black'}" onclick={() => page = ''}>
                <span class="fa-solid fa-pen-to-square"></span>
                Navi Editor
            </a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class="nav-link link-cursor {page == 'library' ? 'bg-warning text-black ' : 'text-warning'}" onclick={() => page = 'library'}>
                <span class="fa-solid fa-book"></span>
                Chip Catalog
            </a>
        </li>
    </ul>
    <hr>
    <div class="footer">
        <div>
            <span>Zach Lambert © 2025</span>
        </div>
        <div class="margin-top-bottom">
            <a href="https://ko-fi.com/zarch" target="_blank"><img class="kofi" src="images/kofi_symbol.png" title="Zach Lambert's Ko-Fi" alt="Kofi"/></a>
            <a href="https://www.youtube.com/@zarcha" target="_blank"><img class="kofi" src="images/youtube.png" title="Zach Lambert's Youtube" alt="Youtube"/></a>
            <a href="https://discord.com/invite/Wa98sZza4g" target="_blank"><img class="kofi" src="images/discord.png" title="Megaman Battle Network! Discord" alt="Discord"/></a>
        </div>
    </div>
</div>

<style>
    .link-cursor {
        cursor: pointer;
    }

    .kofi {
        width: 30px;
    }

    .logo {
        width: 30px; 
        margin-right: 5px;
    }

    .footer {
        text-align: center;
        position: relative;
        height: 50px;
    }
</style>