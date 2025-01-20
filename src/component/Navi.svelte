<script>
    let { port = false, connect, loadNavi, loading} = $props();
</script>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">

    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
            <span class="navbar-brand">Link Analyzer Editor</span>
        </li>
        {#if !port}
        <li class="nav-item">
            <button type="button" class="btn btn-warning" on:click={connect}>Connect</button>
        </li>
        {:else}
        <li class="nav-item">
            <button type="button" class="btn btn-warning" on:click={loadNavi}>Load Navi</button>
        </li>
        <li class="nav-item" style="padding-left: 10px;">
            <button type="button" class="btn btn-warning">Write Navi</button>
        </li>
        {/if}
        {#if loading}
        <li class="nav-item" style="padding-left: 10px; float: right;">
            <div class="spinner-border text-warning"></div>
        </li>
        {/if}
      </ul>
    </div>
</nav>