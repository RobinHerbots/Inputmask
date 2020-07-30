export default typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;

