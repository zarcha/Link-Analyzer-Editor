<script>
    import Search from '../component/library/Search.svelte';
    import Chip from '../component/library/Chip.svelte';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { publish } from '../lib/Store.js'

    let { port } = $props();
    let chips = $state([]);
    let filteredChips = $state([]);
    let maxChips = $state(10);

    async function loadChips() {
        try{
            let res = await axios.get('./link-chips.json');
            chips = res.data;
            filterChips();
        }catch(error){
            console.error(error);
            publish('toasts', {type: 'error', content: 'Failed to load chip list.'});
        }
    }

    function filterChips(searchValue){
        filteredChips = chips;

        if(searchValue){
            filteredChips = filteredChips.filter((chip) => {
                let filterOn;
                let tmpSearch = searchValue;
                if(searchValue.includes(":")){
                    filterOn = [String(chip[searchValue.split(":")[0]]).toLowerCase()];
                    tmpSearch = searchValue.split(":")[1];
                }else{
                    filterOn = [
                        chip.name.toLowerCase(),
                        chip.class.toLowerCase(),
                        chip.id
                    ]
                }
                
                if(String(filterOn).includes(tmpSearch.toLowerCase())){
                    return chip;
                }
            });

            if(filteredChips.length < 10){
                maxChips = filteredChips.length;
            }else{
                maxChips = 10;
            }
        }
    }

    onMount(() => {
        window.onscroll = function() {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
                if((maxChips + 10) <= filteredChips.length) {
                    maxChips += 10;
                }
            }
        };

        loadChips();
    });
</script>

<div class="chip-list-container">
    {#if chips.length > 0}
    <Search port={port} filter={filterChips} />
    {#each {length: maxChips}, i}
        <Chip bind:chipInfo={filteredChips[i]} />
    {/each}
    {/if}
</div>

<style>
    .chip-list-container {
        padding-top: 10px;
    }
</style>