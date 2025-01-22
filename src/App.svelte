<script>
  import Nav from './component/Navi.svelte'
  import VersionUpdate from './component/VersionUpdate.svelte';
  import NumberField from './component/NumberField.svelte';
  import NaviField from './component/NaviField.svelte';
  import LinkAnalyzer from "./lib/LinkAnalyzer.js";
  import linkChip from './lib/LinkChip.js'
  import { delay, int2hex } from "./lib/util.js";
  import ImageField from './component/ImageField.svelte';
    import Footer from './component/Footer.svelte';

  const linkAnalyzer = new LinkAnalyzer();

  let port;
  let isLoading = false;
  let navi;
  let firmwareVersion;

  async function connect(){
    isLoading = true;
    try{
      let tmpPort = await linkAnalyzer.connect();
      await delay(2000);
      firmwareVersion = await linkAnalyzer.writeSync(tmpPort, "v");
      firmwareVersion = firmwareVersion.trim();
      port = tmpPort;
    }catch(err){
      alert("Port busy or not selected");
    }
    
    isLoading = false;
  }

  async function readNaviData(){
    isLoading = true;
    try{
      let tmp = await linkAnalyzer.writeSync(port, "r");
      navi = linkChip.toObject(tmp);
    }catch(err){
      console.error(err);
    }
    isLoading = false;
  }

  async function writeNaviData() {
    isLoading = true;
    let tmp = linkChip.toRaw(navi);
    const  max = 128;
    for(let i = 0; i < 1024 / max; i++){
        let start = i * (max * 2);
        let end = (i * (max * 2)) + (max * 2);
        let bytes = `w:${i * max} ${tmp.raw.substring(start, end)}`;

        await linkAnalyzer.writeSync(port, bytes)
    }
    navi = tmp;
    isLoading = false;
  }

  async function openNaviFile() {
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const reader = new FileReader();

      reader.onload = (event) => {
        let out = "";
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        for(let i = 0; i < uint8Array.length; i++){
          out += int2hex(uint8Array[i]);
        }

        navi = linkChip.toObject(out);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function saveHexFile() {
    navi = linkChip.toRaw(navi);
    const hexArray = new Uint8Array(navi.raw.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    const fileHandle = await window.showSaveFilePicker({
        suggestedName: 'backup.navi',
        types: [
            {
                description: 'Navi Backup',
                accept: { 'application/octet-stream': ['.navi'] }
            }
        ]
    });

    const writableStream = await fileHandle.createWritable();

    await writableStream.write(hexArray);
    await writableStream.close();
  }
</script>

<Nav port={port} 
  hasNavi={navi ? true : false} 
  loading={isLoading}
  loadNavi={readNaviData} 
  writeNavi={writeNaviData} 
  connect={connect} 
  openNavi={openNaviFile} 
  saveNavi={saveHexFile}/>

<div class="container mt-3">
  {#if port}
  <VersionUpdate version={firmwareVersion} />
  {/if}
  {#if navi}
  <div class="card all-sides-shadow">
    <div class="card-body">
      <div class="row">
        <div class="col"><NaviField name="Navi ID" bind:value={navi.naviId}/></div>
      </div>
      <div class="row">
        <div class="col"><NumberField name="PET ID" bind:value={navi.petId}/></div>
      </div>
      <div class="row">
        <div class="col"><NumberField name="Navi Level" bind:value={navi.level} /></div>
        <div class="col"><NumberField name="Navi EXP" bind:value={navi.experiance} /></div>
      </div>
      <div class="row">
        <div class="col"><NumberField name="Navi HP" bind:value={navi.health} /></div>
        <div class="col"><NumberField name="Navi ATTK" bind:value={navi.attack} /></div>
      </div>
      <div class="row">
        <div class="col"><NumberField name="Navi Wins" bind:value={navi.wins} /></div>
        <div class="col"><NumberField name="Navi Losses" bind:value={navi.losses} /></div>
      </div>
      <div class="row">
        <div class="col"><ImageField name="Cross Sprite" bind:value={navi.crossSprite} /></div>
        <div class="col"><ImageField name="Win Sprite" bind:value={navi.winSprite} /></div>
        <div class="col"><ImageField name="Lose Sprite" bind:value={navi.loseSprite} /></div>
      </div>
    </div>
  </div>
  {/if}
</div>
<Footer />

<style>
  .all-sides-shadow {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  }
</style>
