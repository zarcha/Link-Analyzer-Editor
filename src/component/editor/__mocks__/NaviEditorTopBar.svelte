<script>
    const { loadNavi, writeNavi, openNavi, saveNavi} = $props();
</script>

<div data-testid="mocked-navieditortopbar">
    <button onclick={loadNavi}>Load Navi</button>
    <button onclick={writeNavi}>Write Navi</button>
    <button onclick={openNavi}>Open Navi</button>
    <button onclick={saveNavi}>Save Navi</button>
</div>