
(function() {
	/*
	 * QRコード読み取り
	 */


	captureBarcode = function() {
		applican.barcode.captureBarcode(captureBarcodeSuccess, captureBarcodeError);
	};

	/*
	 * QRコード読み取り成功時のcallback処理
	 */
	function captureBarcodeSuccess(res) {
		var dump = "QRコードを読み取りました。\n";
		dump    += "データ:" + res.codeData + "\n";
		document.getElementById("dumpAreaBarcode").value = dump;
		document.getElementById("visi").style.visibility="visible";
	}

	/*
	 * QRコード読み取り失敗時のcallback処理
	 */
	function captureBarcodeError(e) {
		var dump = "QRコードの読み取りに失敗しました。\n";
		document.getElementById("dumpAreaBarcode").value = dump;

	}

	/********************* イベント登録 *********************/
	document.addEventListener("deviceready", function() {
		// 「QRコード読み取り」ボタン押下処理
		document.getElementById("barcodeBtn").addEventListener("touchend", captureBarcode, false);
	});

})();


