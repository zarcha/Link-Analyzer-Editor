<script>
    import axios from 'axios';
    import LinkAnalyzer from '../../lib/LinkAnalyzer';

    let {port = $bindable()} = $props();
    let currentVersion = $state('');
    let version = $state('');

    function startup(){
        getLinkAnalyzerVersion();
        getCurrentReleaseVersion();
    }

    async function getCurrentReleaseVersion(){
        const res = await axios.get('https://api.github.com/repos/zarcha/Link-Analyzer-Firmware/tags');
        currentVersion = res.data[0].name;
    }

    async function openFirmware() {
        window.open('https://github.com/zarcha/Link-Analyzer-Firmware/releases', '_blank').focus();
    }

    async function openGuide() {
        window.open('https://github.com/zarcha/Link-Analyzer-Firmware#flashingupdating', '_blank').focus();
    }

    async function getLinkAnalyzerVersion(){
        if(port){
            version = await LinkAnalyzer.writeSync(port, 'v');
        }
    }

    $effect(startup);
</script>

<div>
    {#if currentVersion && version != currentVersion}
    <div style="padding-bottom: 10px;">
        <div class="card">
            <div class="card-body" style="text-align: center;">
                <p class="h3 text-danger">Your Link Analyzer is not up to date!</p>
                <p>Link Analyzer Version: {version}</p>
                <p>Current Version: {currentVersion}</p>
                <p class="text-warning">Your Link Analyzer may not work with this app without updating!</p>
                <div>
                    <button type="button" class="btn btn-warning" onclick={openFirmware}>Download Firmware</button>
                    <button type="button" class="btn btn-warning" onclick={openGuide}>Update Guide</button>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>

<style>
</style>