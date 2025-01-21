<script>
    let { port = false, loading, connect, loadNavi, writeNavi, openNavi, saveNavi} = $props();
</script>

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
                <button type="button" class="btn btn-warning" on:click={writeNavi}><i class="fa-solid fa-download"></i></button>
            </li>
            <li class="nav-item" style="padding-left: 10px;">
                <button type="button" class="btn btn-warning" on:click={openNavi}><i class="fa-solid fa-folder-open"></i></button>
            </li>
            <li class="nav-item" style="padding-left: 10px;">
                <button type="button" class="btn btn-warning" on:click={saveNavi}><i class="fa-solid fa-floppy-disk"></i></button>
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