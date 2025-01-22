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

<div class="align-center pad-bottom">
    <div class="dropdown">
        <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
            {naviList[value - 1]}
        </button>
        <ul class="dropdown-menu">
            {#each naviList as navi, index}
            <li class="pointer"><a class="dropdown-item" on:click={() => value = index + 1}>{navi}</a></li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .align-center {
        text-align: center;
    }

    .pad-bottom {
        padding-bottom: 10px;
    }

    .pointer {
        cursor: pointer;
    }
</style>