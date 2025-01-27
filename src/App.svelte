<script>
  import NaviEditor from "./pages/NaviEditor.svelte";
  import SideBar from "./component/SideBar.svelte";
    import ChipLibrary from "./pages/ChipLibrary.svelte";

  let port = $state();
  let page = $state("");
</script>

<div>
  <div class="sidebar p-3">
    <SideBar bind:port={port} bind:page={page}/>
  </div>
  <div class="content">
    {#if page == "library"}
    <ChipLibrary />
    {:else}
    <NaviEditor bind:port={port}/>
    {/if}
  </div>
</div>

<style>
  .sidebar {
    margin: 0;
    padding: 0;
    width: 240px;
    position: fixed;
    height: 100%;
    overflow: auto;
    z-index: 1;
    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.15);
  }

  div.content {
    margin-left: 240px;
  }
</style>