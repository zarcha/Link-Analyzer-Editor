export default class LinkAnalyzer {
    async connect(){
        let port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        return port;
    }

    async write(port, data){
        const writer = port.writable.getWriter();

        await writer.write(new TextEncoder().encode(data + '\n'));

        writer.releaseLock();
    }

    async writeSync(port, data){
        return new Promise(async (resolve, reject) => {
            await this.write(port, data);

            let res = await this.read(port, 30000);

            resolve(res);
        });
    }

    async read(port, timeout){
        return new Promise(async (resolve, reject) => {
            let timeoutRead;
            // if(timeout){
            //     timeoutRead = setTimeout((reject) => {
            //         reject("Timed out waiting");
            //     }, timeout, reject);
            // }
            const reader = port.readable.getReader();
            let res = "";

            while (true) {
                const { value, done } = await reader.read();
                
                res += new TextDecoder().decode(value);

                if(res.includes("\n")) break;
            }

            reader.releaseLock();
            // clearTimeout(timeoutRead);

            resolve(res.replace(/(\r\n|\n|\r)/gm, ""));
        })
        
    }
}