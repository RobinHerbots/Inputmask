export {keyCode, toKey, toKeyCode, keys};

const keyCode = {
    "AltGraph": 18,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Backspace": 8,
    "BACKSPACE_SAFARI": 127,
    "CapsLock": 20,
    "Delete": 46,
    "End": 35,
    "Enter": 13,
    "Escape": 27,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "Space": 32,
    "Tab": 9,
    "c": 67,
    "x": 88,
    "z": 90,
    "Shift": 16,
    "Control": 17,
    "Alt": 18,
    "Pause": 19,
    "Meta_LEFT": 91,
    "Meta_RIGHT": 92,
    "ContextMenu": 93,
    "Process": 229,
    "Unidentified": 229,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123
};

const keyCodeRev = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[value] = acc[value] === undefined ? key : acc[value] , acc), {});
const keys = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[key] = key === "Space" ? " " : key, acc), {});

function toKey(keyCode, shiftKey) {
    return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}

function toKeyCode(key) {
    return keyCode[key];
}
