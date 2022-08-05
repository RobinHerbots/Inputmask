export {keyCode, toKey, toKeyCode, keys};

const keyCode = {
    "Backspace": 8,
    "BACKSPACE_SAFARI": 127,
    "Delete": 46,
    "Down": 40,
    "End": 35,
    "Enter": 13,
    "Escape": 27,
    "Home": 36,
    "Insert": 45,
    "Left": 37,
    "PageDown": 34,
    "PageUp": 33,
    "Right": 39,
    "Space": 32,
    "Tab": 9,
    "Up": 38,
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
    "KEY_229": 229,
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

const keyCodeRev = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[value] = key, acc), {});
const keys = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[key] = key, acc), {});

function toKey(keyCode, shiftKey) {
    return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}

function toKeyCode(key) {
    return keyCode[key];
}
