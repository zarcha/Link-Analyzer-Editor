<script>
    const { port = false, hasNavi, loading, loadNavi, writeNavi, openNavi, saveNavi, unsaved, undoChanges } = $props();
</script>

<div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark custom-nav">
        <div class="container-fluid">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button data-testid="load-navi" type="button" class="btn btn-warning {port ? '' : 'disabled'}" onclick={loadNavi} title="Read from Link Analyzer"><i class="fa-solid fa-upload"></i></button>
                </li>
                <li class="nav-item margin-left">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button data-testid="write-navi" type="button" class="btn btn-warning {hasNavi ? '' : 'disabled'} {port ? '' : 'disabled'}" onclick={writeNavi} title="Write to Link Analyzer"><i class="fa-solid fa-download"></i></button>
                </li>
                <li class="nav-item margin-left">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button data-testid="open-navi" type="button" class="btn btn-warning" onclick={openNavi} title="Load Navi from file"><i class="fa-solid fa-folder-open"></i></button>
                </li>
                <li class="nav-item margin-left">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button data-testid="save-navi" type="button" class="btn btn-warning {hasNavi ? '' : 'disabled'}" onclick={saveNavi} title="Save Navi to file"><i class="fa-solid fa-floppy-disk"></i></button>
                </li>
                <li class="nav-item margin-left">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button data-testid="save-navi" type="button" class="btn btn-warning {unsaved ? '' : 'disabled'}" onclick={undoChanges} title="Undo Changes"><i class="fa-solid fa-rotate-right"></i></button>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                {#if loading}
                <li class="nav-item">
                    <div data-testid="loading-icon" class="spinner-border text-warning"></div>
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

    .margin-left {
        margin-left: 10px;
    }
</style>