<script>
    import Chip from '../component/library/Chip.svelte';
    import axios from 'axios';
    import Search from '../component/library/Search.svelte';

    let { port } = $props();
    let chips = $state([]);
    let filteredChips = $state([]);
    let maxChips = $state(10);

    async function load() {
        let res = await axios.get('./link-chips.json');
        chips = res.data;
        filterChips();
    }

    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
            maxChips += 10;
            if(maxChips > chips.length) maxChips = chips.length;
        }
    };

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

    load();

</script>

<div class="container">
    {#if chips.length > 0}
    <Search port={port} filter={filterChips} />
    {#each {length: maxChips}, i}
        <Chip chipInfo={filteredChips[i]} />
    {/each}
    {/if}
</div>

<style>

    .container {
        padding-top: 10px;
    }
    
</style>