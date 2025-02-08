<script>
    import { subscribe } from '../lib/Store.js'
    import { onMount, onDestroy } from 'svelte';

    const types = {
        error: {
            bgColor: 'danger',
            textColor: 'white',
            icon: 'fa-circle-xmark'
        },
        warning: {
            bgColor: 'warning',
            textColor: 'black',
            icon: 'fa-triangle-exclamation'
        },
        success: {
            bgColor: 'success',
            textColor: 'white',
            icon: 'fa-circle-check'
        },
        info: {
            bgColor: 'secondary',
            textColor: 'white',
            icon: 'fa-circle-info'
        }
    }

    let toasts = $state([])
    let unsubscribe;

    const clearTimer = setInterval(() => {
        const currentTime = Date.now();
        toasts = toasts.filter((toast) => {
            if((currentTime - toast.created) < 5000){
                return toast
            }
        });
    }, 3000);

    onMount(() => {
        unsubscribe = subscribe('toasts', (data) => {
            toasts.push({
                id: crypto.randomUUID(),
                type: data.type,
                content: data.content,
                created: Date.now()
            });
        });
    });

    onDestroy(() => {
        unsubscribe();
        clearInterval(clearTimer);
    });

</script>

<div class="toast-container">
    {#each [...toasts].reverse() as toast}
    <div id="toast-{toast.id}" class="toast-box bg-{types[toast.type].bgColor}" style="color: {types[toast.type].textColor}">
        <div>
            <span class="fa-solid {types[toast.type].icon}"></span>
        </div>
        <div class="toast-content">
            {toast.content}
        </div>
    </div>
    {/each}
</div>

<style>
    .toast-container {
        z-index: 99;
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 300px;
    }

    .toast-content {
        margin-top: 5px;
    }

    .toast-box {
        padding: 10px;
        border-radius: 5px;
        margin-top: 5px;
        opacity: 1;
    }

    .toast-close {
        margin-left: 10px;
        font-size: 12px;
        font-weight: bold;
        float: right;
    }
</style>