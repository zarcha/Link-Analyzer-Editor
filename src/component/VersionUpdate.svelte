<script>
    import axios from "axios";

    let {version} = $props();
    let currentVersion = $state();

    async function getCurrentVersion(){
        let res = await axios.get("https://api.github.com/repos/zarcha/Link-Analyzer-Firmware/tags");
        currentVersion = res.data[0].name;
    }

    function openFirmware(){
        window.open("https://github.com/zarcha/Link-Analyzer-Firmware/releases", '_blank').focus();
    }

    function openGuide(){
        window.open("https://github.com/zarcha/Link-Analyzer-Firmware#flashingupdating", "_blank").focus();
    }

    getCurrentVersion();
</script>

{#if currentVersion && version != currentVersion}
<div style="padding-bottom: 10px;">
    <div class="card all-sides-shadow">
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

<style>
    .all-sides-shadow {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
    }
</style>