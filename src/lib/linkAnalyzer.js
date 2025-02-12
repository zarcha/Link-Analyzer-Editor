async function connect() {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    return port;
}

async function write(port, data) {
    const writer = port.writable.getWriter();

    await writer.write(new TextEncoder().encode(data + '\n'));

    writer.releaseLock();

    return true;
}

async function writeSync(port, data) {
    await this.write(port, data);
    return await this.read(port, 30000);
}

async function read(port, timeout) {
    //Needs to be async inside to capture timeout error properly and reader.read() has to be await for some reason because there is no
    //new data event to trigger on so while(true) is needed and reader.read().then causes infa loop.
    // eslint-disable-next-line no-async-promise-executor
    /* prettier-ignore */ return new Promise(async (resolve, reject) => { // NOSONAR
        const reader = port.readable.getReader();
        let res = '';
        let readTimeout;

        if (timeout) {
            readTimeout = setTimeout(() => {
                reader.releaseLock();
                reject(new Error(`Timed out reading for ${timeout / 1000}s`));
            }, timeout);
        }

        while (true) {
            const { value } = await reader.read();

            res += new TextDecoder().decode(value);

            if (res.includes('\n')) break;
        }

        clearTimeout(readTimeout);
        reader.releaseLock();

        resolve(res.replace(/(\r\n|\n|\r)/gm, ''));
    });
}

export default { write, writeSync, read, connect };
