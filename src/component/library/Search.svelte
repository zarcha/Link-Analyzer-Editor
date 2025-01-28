<script>
    import LinkAnalyzer from "../../lib/LinkAnalyzer";
    import { bin2hex, hex2int } from "../../lib/util";

    const linkAnalyzer = new LinkAnalyzer();
    let { filter, port } = $props();
    let filterValue = $state("");

    async function getLinkAnalyzerPinout(){
        const pinout = await linkAnalyzer.writeSync(port, "p");
        const bin = pinout.substr(2).slice(0, -1).split("").reverse().join("").padStart(16, '0');
        filterValue = (parseInt(bin, 2) >> 0).toString();
        filter(filterValue);
    }

</script>

<div class="search">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Chip ID" bind:value={filterValue}>
        <button class="btn btn-warning {port ? "" : "disabled"}" onclick={getLinkAnalyzerPinout}>Read</button>
        <button class="btn btn-warning" onclick={() => filter(filterValue)}>Search</button>
    </div>
</div>

<style>
    .search {
        margin-bottom: 10px;
        
        button {
            border-left: 1px solid black;
        }
    }
</style>