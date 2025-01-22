<script>
    let { port = false, hasNavi, loading, connect, loadNavi, writeNavi, openNavi, saveNavi} = $props();
</script>

<div class="bottom-shadow">
    <div class="app-title">
        <span class="h3">Link Analyzer Editor</span>
    </div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
            <ul class="navbar-nav mr-auto">
                {#if !port}
                <li class="nav-item">
                    <button type="button" class="btn btn-warning" on:click={connect}>Connect</button>
                </li>
                {:else}
                <li class="nav-item">
                    <button type="button" class="btn btn-warning" on:click={loadNavi}><i class="fa-solid fa-upload"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning {hasNavi ? "" : "disabled"}" on:click={writeNavi}><i class="fa-solid fa-download"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning" on:click={openNavi}><i class="fa-solid fa-folder-open"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning {hasNavi ? "" : "disabled"}" on:click={saveNavi}><i class="fa-solid fa-floppy-disk"></i></button>
                </li>
                {/if}
            </ul>
            <ul class="navbar-nav ml-auto">
                {#if loading}
                <li class="nav-item" style="">
                    <div class="spinner-border text-warning"></div>
                </li>
                {/if}
            </ul>
        </div>
    </nav>
</div>

<style>
    .app-title {
        position: absolute;
        z-index: 1;
        color: white;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .bottom-shadow {
        box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.35);
    }
</style>