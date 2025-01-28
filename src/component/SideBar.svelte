<script>
    import { delay } from "../lib/util";
    import LinkAnalyzer from "../lib/LinkAnalyzer";

    const linkAnalyzer = new LinkAnalyzer();
    let {port = $bindable(), page = $bindable()} = $props();
    let connecting = $state(false);

    async function connect(){
        if(!port){
            try{
                connecting = true;
                let tmpPort = await linkAnalyzer.connect();
                await delay(2000);
                port = tmpPort;
            }catch(err){
                alert("Port busy or not selected");
            }
        }else{
            port.close();
            port = null;
        }
        connecting = false;
    }
</script>

<div class="d-flex flex-column flex-shrink-0">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img class="logo" src="icon.png"/>
        <span>Link Analyzer</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <a class="nav-link text-black link-cursor {port ? "bg-success" : "bg-danger"}" style="text-align: center;" onclick={connect}>
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
            <a class="nav-link link-cursor {page == "library" ? "text-warning" : "bg-warning text-black"}" onclick={() => page = ""}>
                <span class="fa-solid fa-pen-to-square"></span>
                Navi Editor
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-cursor {page == "library" ? "bg-warning text-black " : "text-warning"}" onclick={() => page = "library"}>
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
            <a href="https://ko-fi.com/zarch" target="_blank"><img class="kofi" src="kofi_symbol.png" /></a>
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