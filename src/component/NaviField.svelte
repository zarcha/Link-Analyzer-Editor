<script>
    let {name, value = $bindable()} = $props();

    let naviList = [
        "HeatMan",
        "ElecMan",
        "SlashMan",
        "EraseMan",
        "ChargeMan",
        "SpoutMan/AquaMan",
        "TomahawkMan",
        "TenguMan",
        "GroundMan",
        "DustMan",
        "MegaMan",
        "ProtoMan",
        "Dark ProtoMan",
        "Colonel",
        "Forte/Bass",
        "Dark MegaMan"
    ];
</script>

<div style="padding-bottom: 10px;">
    <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
            {naviList[value - 1]}
        </button>
        <ul class="dropdown-menu">
            {#each naviList as navi, index}
            <li><a class="dropdown-item" on:click={() => value = index + 1}>{navi}</a></li>
            {/each}
        </ul>
    </div>
</div>