<script>
    let {name, getValue, setValue} = $props();

</script>

<div style="padding-bottom: 10px;">
    <div class="input-group">
        <span class="input-group-text" style="width: 120px">{name}</span>
        <input type="text" class="form-control" bind:value={getValue} on:change={() => setValue(event.target.value)}>
        </div>
</div>