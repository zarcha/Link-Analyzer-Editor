<script>
    import { onMount } from 'svelte';

    let {name, value = $bindable(), maxValue} = $props();

    let validInput = $state(true);

    function validate(){
        validInput = value <= maxValue && value >= 0;
    }

    onMount(() => {
        validate();
    });
</script>

<div style="padding-bottom: 10px;">
    <div class="input-group">
        <span data-testid="field-name" class="input-group-text" style="width: 120px">{name}</span>
        <input data-testid="field-value" type="number" class="form-control {validInput ? '' : 'is-invalid'}" bind:value={value} oninput={validate}>
    </div>
</div>