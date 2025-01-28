<script>
    let { port = false, hasNavi, loading, connect, loadNavi, writeNavi, openNavi, saveNavi} = $props();
</script>

<div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark custom-nav">
        <div class="container-fluid">
            <ul class="navbar-nav mr-auto">
                {#if port}
                <li class="nav-item">
                    <button type="button" class="btn btn-warning" onclick={loadNavi}><i class="fa-solid fa-upload"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning {hasNavi ? "" : "disabled"}" onclick={writeNavi}><i class="fa-solid fa-download"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning" onclick={openNavi}><i class="fa-solid fa-folder-open"></i></button>
                </li>
                <li class="nav-item" style="padding-left: 10px;">
                    <button type="button" class="btn btn-warning {hasNavi ? "" : "disabled"}" onclick={saveNavi}><i class="fa-solid fa-floppy-disk"></i></button>
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
    .custom-nav {
        height: 54px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(222, 226, 230, 0.15);
    }
</style>