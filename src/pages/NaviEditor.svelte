<script>
    import NaviEditorTopBar from '../component/editor/NaviEditorTopBar.svelte'
    import VersionUpdate from '../component/editor/VersionUpdate.svelte';
    import NumberField from '../component/editor/NumberField.svelte';
    import NaviField from '../component/editor/NaviField.svelte';
    import ImageField from '../component/editor/ImageField.svelte';
    import LinkAnalyzer from '../lib/linkAnalyzer.js';
    import LinkChip from '../lib/linkChip.js'
    import FileUtil from '../lib/fileUtil.js';
    import { publish } from '../lib/store.js'
  
    let {port = $bindable()} = $props();

    let isLoading = $state(false);
    let navi = $state();
    let ogNavi = $state();
  
    async function readNaviData(){
      isLoading = true;

      try{
        const tmp = await LinkAnalyzer.writeSync(port, 'r');
        navi = LinkChip.toObject(tmp);
        ogNavi = {...navi};
        publish('toasts', {type: 'success', content: 'Navi loaded from Link Analyzer.'});
      }catch(error){
        publish('toasts', {type: 'error', content: error.message || error});
      }

      isLoading = false;
    }
  
    async function writeNaviData() {
      isLoading = true;
      try{
        
        const tmp = LinkChip.toRaw(navi);
        const  max = 128;
        for(let i = 0; i < 1024 / max; i++){
            const start = i * (max * 2);
            const end = (i * (max * 2)) + (max * 2);
            const bytes = `w:${i * max} ${tmp.raw.substring(start, end)}`;
    
            await LinkAnalyzer.writeSync(port, bytes)
        }
        navi = tmp;
          ogNavi = {...navi};
        publish('toasts', {type: 'success', content: 'Navi written to Link Analyzer.'});
        
      }catch(error){
        publish('toasts', {type: 'error', content: error.message || error});
      }

      isLoading = false;
    }
  
    async function openNaviFile() {
      try{
        const tmp = await FileUtil.openNavi();
        if(tmp){
          navi = tmp;
          ogNavi = {...tmp};
          publish('toasts', {type: 'success', content: 'Loaded Navi from file.'});
        }
      }catch(error){
        publish('toasts', {type: 'error', content: error.message || error});
      }
      
    }

    async function saveNaviFile() {
      try{
        const fileName = await FileUtil.saveNavi(navi);
        if(fileName){
            ogNavi = {...navi};
          publish('toasts', {type: 'success', content: `Navi saved to file as ${fileName}`});
        }
      }catch(error){
        publish('toasts', {type: 'error', content: error.message || error});
      }
    }

    function undoChanges(){
        navi = {...ogNavi}
        publish('toasts', {type: 'success', content: 'Changes have been undone.'})
    }
</script>

<div>
    <NaviEditorTopBar port={port} 
    hasNavi={navi ? true : false} 
    loading={isLoading}
    loadNavi={readNaviData} 
    writeNavi={writeNaviData}
    openNavi={openNaviFile} 
    saveNavi={saveNaviFile}
    unsaved={JSON.stringify(navi) != JSON.stringify(ogNavi)}
    undoChanges={undoChanges}/>

    <div class='container'>
      {#if port}
      <VersionUpdate port={port} />
      {/if}
      {#if navi}
      <div class='card'>
          <div class='card-body'>
              <div class='row'>
                  <div class='col'><NaviField bind:value={navi.naviId}/></div>
              </div>
              <div class='row'>
                  <div class='col'><NumberField name='PET ID' bind:value={navi.petId} maxValue=65535 /></div>
              </div>
              <div class='row'>
                  <div class='col'><NumberField name='Navi Level' bind:value={navi.level} maxValue=255 /></div>
                  <div class='col'><NumberField name='Navi EXP' bind:value={navi.experience} maxValue=65535 /></div>
              </div>
              <div class='row'>
                  <div class='col'><NumberField name='Navi HP' bind:value={navi.health} maxValue=255 /></div>
                  <div class='col'><NumberField name='Navi ATTK' bind:value={navi.attack} maxValue=255 /></div>
              </div>
              <div class='row'>
                  <div class='col'><NumberField name='Navi Wins' bind:value={navi.wins} maxValue=255 /></div>
                  <div class='col'><NumberField name='Navi Losses' bind:value={navi.losses} maxValue=255 /></div>
              </div>
              <div class='row'>
                  <div class='col'><ImageField name='Beast Out Sprite' bind:value={navi.beastOutSprite} /></div>
                  <div class='col'><ImageField name='Cross Sprite' bind:value={navi.crossSprite} /></div>
                  <div class='col'><ImageField name='Win Sprite' bind:value={navi.winSprite} /></div>
                  <div class='col'><ImageField name='Lose Sprite' bind:value={navi.loseSprite} /></div>
              </div>
          </div>
      </div>
      {/if}
    </div>
</div>
  
<style>
</style>  