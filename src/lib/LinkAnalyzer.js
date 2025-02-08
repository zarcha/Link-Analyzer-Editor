async function connect() {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    return port;
}

async function write(port, data) {
    const writer = port.writable.getWriter();

    await writer.write(new TextEncoder().encode(data + '\n'));

    writer.releaseLock();
}

async function writeSync(port, data) {
    await this.write(port, data);
    return await this.read(port, 30000);
}

async function read(port, timeout) {
    const reader = port.readable.getReader();
    let res = '';

    const readTimeout = setTimeout(() => {
        throw new Error(`Timed out reading for ${timeout / 1000}s`);
    }, timeout);

    while (true) {
        const { value } = await reader.read();

        res += new TextDecoder().decode(value);

        if (res.includes('\n')) break;
    }

    clearTimeout(readTimeout);
    reader.releaseLock();

    return res.replace(/(\r\n|\n|\r)/gm, '');
}

export default { write, writeSync, read, connect };
