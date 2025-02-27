export { keyCode, toKey, toKeyCode, keys };

const ignorables = {
    Alt: 18,
    AltGraph: 18,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    Backspace: 8,
    CapsLock: 20,
    Control: 17,
    ContextMenu: 93,
    Dead: 221,
    Delete: 46,
    End: 35,
    Escape: 27,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    Home: 36,
    Insert: 45,
    NumLock: 144,
    PageDown: 34,
    PageUp: 33,
    Pause: 19,
    PrintScreen: 44,
    Process: 229,
    Shift: 16,
    ScrollLock: 145,
    Tab: 9,
    Unidentified: 229
  },
  keyCode = {
    c: 67,
    x: 88,
    z: 90,
    BACKSPACE_SAFARI: 127,
    Enter: 13,
    Meta_LEFT: 91,
    Meta_RIGHT: 92,
    Space: 32,
    ...ignorables
  },
  keyCodeRev = Object.entries(keyCode).reduce(
    (acc, [key, value]) =>
      (
        // eslint-disable-next-line no-sequences
        (acc[value] = acc[value] === undefined ? key : acc[value]), acc
      ),
    {}
  ),
  keys = Object.entries(keyCode).reduce(
    // eslint-disable-next-line no-sequences
    (acc, [key, value]) => ((acc[key] = key === "Space" ? " " : key), acc),
    {}
  );

function toKey(keyCode, shiftKey) {
  return (
    keyCodeRev[keyCode] ||
    (shiftKey
      ? String.fromCharCode(keyCode)
      : String.fromCharCode(keyCode).toLowerCase())
  );
}

function toKeyCode(key) {
  return keyCode[key];
}
