<script>
  import Nav from './component/Navi.svelte'
  import TextField from './component/TextField.svelte';
  import LinkAnalyzer from "./lib/LinkAnalyzer.js";
  import LinkNaviChip from "./lib/LinkNaviChip.js";
  import { delay } from "./lib/util.js";

  const linkAnalyzer = new LinkAnalyzer();

  let port;
  let isLoading = false;
  let isNaviSet = false;
  let version;

  async function connect(){
    isLoading = true;
    try{
      let tempPort = await linkAnalyzer.connect();
      await delay(2000);
      await linkAnalyzer.write(tempPort, "v");
      version = await linkAnalyzer.read(tempPort);
      port = tempPort;
    }catch(err){
      console.error("Port busy or not selected");
    }
    
    isLoading = false;
  }

  async function readNaviData(){
    isLoading = true;
    try{
      await linkAnalyzer.write(port, "r");
      let tmp = await linkAnalyzer.read(port, 30000)
      LinkNaviChip.setNaviData(tmp);
      isNaviSet = true;
    }catch(err){
      console.error(err);
    }
    isLoading = false;
  }

  async function getLinkAnalyzerVersion() {
    await linkAnalyzer.write(port, "v");
    return await linkAnalyzer.read(port);
  }

</script>

<Nav port={port} loadNavi={readNaviData} connect={connect} loading={isLoading}/>
<div class="container mt-3">
  {#if isNaviSet}
  <div class="card">
    <div class="card-body">
      <TextField name="PET ID" getValue={LinkNaviChip.getPETId()} />
      <TextField name="Navi ID" getValue={LinkNaviChip.getNaviId()} setValue={LinkNaviChip.setNaviId}/>
      <TextField name="Navi Level" getValue={LinkNaviChip.getLevel()} />
      <TextField name="Navi EXP" getValue={LinkNaviChip.getExperiance()} />
      <TextField name="Navi HP" getValue={LinkNaviChip.getHealth()} />
      <TextField name="Navi ATTK" getValue={LinkNaviChip.getAttack()} />
      <TextField name="Navi Wins" getValue={LinkNaviChip.getWins()} />
      <TextField name="Navi Losses" getValue={LinkNaviChip.getLosses()} />
      <!-- <p>PET ID: {naviData.getLockId()}</p>
      <p>Navi ID: {naviData.getNaviId()}</p>
      <p>Navi Level: {naviData.getLevel()}</p>
      <p>Navi EXP: {naviData.getExperiance()}</p>
      <p>Navi HP: {naviData.getHealth()}</p>
      <p>Navi ATTK: {naviData.getAttack()}</p>
      <p>Navi Wins: {naviData.getWins()}</p>
      <p>Navi Losses: {naviData.getLosses()}</p> -->
    </div>
  </div>
  {/if}
</div>

<style>

</style>
