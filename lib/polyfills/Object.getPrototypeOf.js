if (typeof Object.getPrototypeOf !== "function") {
  Object.getPrototypeOf =
    typeof "test".__proto__ === "object"
      ? function (object) {
          return object.__proto__;
        }
      : function (object) {
          return object.constructor.prototype;
        };
}
