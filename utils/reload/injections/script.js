const LOCAL_RELOAD_SOCKET_PORT = 8081;
const LOCAL_RELOAD_SOCKET_URL = `ws://localhost:${LOCAL_RELOAD_SOCKET_PORT}`;

class MessageInterpreter {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static send(message) {
        return JSON.stringify(message);
    }
    static receive(serializedMessage) {
        return JSON.parse(serializedMessage);
    }
}

let needToUpdate = false;
function initReloadClient({ watchPath, onUpdate, onForceReload, }) {
    const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
    function sendUpdateCompleteMessage() {
        socket.send(MessageInterpreter.send({ type: 'done_update' }));
    }
    socket.addEventListener('message', event => {
        const message = MessageInterpreter.receive(String(event.data));
        switch (message.type) {
            case 'do_update': {
                if (needToUpdate) {
                    sendUpdateCompleteMessage();
                    needToUpdate = false;
                    onUpdate();
                }
                return;
            }
            case 'wait_update': {
                if (!needToUpdate) {
                    needToUpdate = message.path.includes(watchPath);
                }
                return;
            }
            case 'force_reload': {
                onForceReload?.();
                return;
            }
        }
    });
    socket.onclose = () => {
        console.log(`Reload server disconnected.\nPlease check if the WebSocket server is running properly on ${LOCAL_RELOAD_SOCKET_URL}. This feature detects changes in the code and helps the browser to reload the extension or refresh the current tab.`);
        setTimeout(() => {
            initReloadClient({ watchPath, onUpdate });
        }, 1000);
    };
    return socket;
}

function addHmrIntoScript(watchPath) {
    const reload = () => {
        chrome.runtime.reload();
    };
    initReloadClient({
        watchPath,
        onUpdate: reload,
        onForceReload: reload,
    });
}

export { addHmrIntoScript as default };
