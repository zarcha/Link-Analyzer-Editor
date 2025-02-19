<script>
    import LinkAnalyzer from '../../lib/linkAnalyzer.js';
    import { onMount } from 'svelte';

    const { filter, port } = $props();
    let filterValue = $state('');

    async function getLinkAnalyzerPinout(){
        const pinout = await LinkAnalyzer.writeSync(port, 'p');
        const bin = pinout.substr(2).slice(0, -1).split('').reverse().join('').padStart(16, '0');
        filterValue = (parseInt(bin, 2) >> 0).toString();
        filter(filterValue);
    }

    onMount(() => {
        window.addEventListener('keydown', ((event) => {
            if (event.key === 'Enter') {
                filter(filterValue);
            }
        }));
    });
</script>

<div class="search">
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Chip ID" bind:value={filterValue} title="name, id, class, or name:cannon, id:230, class:mega">
        <button class="btn btn-warning {port ? '' : 'disabled'}" onclick={getLinkAnalyzerPinout} title="Gets pinout of real chip from Link Analyzer">Read</button>
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