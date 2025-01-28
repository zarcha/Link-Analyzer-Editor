<script>
    let {name, value = $bindable()} = $props();

</script>

<div style="padding-bottom: 10px;">
    <div class="input-group">
        <span class="input-group-text" style="width: 120px">{name}</span>
        <input type="number" class="form-control" bind:value={value}>
    </div>
</div>