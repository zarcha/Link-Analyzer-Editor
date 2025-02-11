<script>
    import NaviEditorTopBar from '../component/editor/NaviEditorTopBar.svelte'
    import VersionUpdate from '../component/editor/VersionUpdate.svelte';
    import NumberField from '../component/editor/NumberField.svelte';
    import NaviField from '../component/editor/NaviField.svelte';
    import ImageField from '../component/editor/ImageField.svelte';
    import LinkAnalyzer from '../lib/LinkAnalyzer.js';
    import LinkChip from '../lib/LinkChip.js'
    import FileUtil from '../lib/FileUtil';
    import { publish } from '../lib/Store.js'
  
    let {port = $bindable()} = $props();

    let isLoading = $state(false);
    let navi = $state();
  
    async function readNaviData(){
      isLoading = true;

      try{
        const tmp = await LinkAnalyzer.writeSync(port, 'r');
        navi = LinkChip.toObject(tmp);
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
          publish('toasts', {type: 'success', content: `Navi saved to file as ${fileName}`});
        }
      }catch(error){
        publish('toasts', {type: 'error', content: error.message || error});
      }
    }

  </script>
<div>
    <NaviEditorTopBar port={port} 
    hasNavi={navi ? true : false} 
    loading={isLoading}
    loadNavi={readNaviData} 
    writeNavi={writeNaviData}
    openNavi={openNaviFile} 
    saveNavi={saveNaviFile}/>

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
                  <div class='col'><NumberField name='Navi EXP' bind:value={navi.experiance} maxValue=65535 /></div>
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
                  <div class='col'><ImageField name='Unknown Sprite' bind:value={navi.unknownSprite} /></div>
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