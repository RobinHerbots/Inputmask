(() => {
	window.mm = (i, mask) => {
		const d = {9: "[0-9]", a: "[a-z]"}, msk = mask.split("");
		i.addEventListener("input", handler);
		i.addEventListener("focus", handler);

		function handler(e) {
			if (e.type === "focus" && i.value !== "") return;
			let mskd = [],
				s = i.selectionStart - 1;
			msk.forEach((el, n) => {
				if (d[el]) {
					let t = new RegExp(d[el], "i").test(i.value.charAt(n));
					mskd.push(t ? i.value.charAt(n) : "_");
					if (t && s === n && i.value.charAt(n) !== "_") {
						s++;
					}
				} else {
					mskd.push(el);
					if (s === n) s++;
				}
			});
			i.value = mskd.join("");
			i.selectionStart = i.selectionEnd = s < 0 ? 0 : s;
			setTimeout(function () {
				i.selectionStart = i.selectionEnd = s < 0 ? 0 : s;
			}, 0);
		}
	};
})();