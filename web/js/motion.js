(function () {

  var $arrow;
  var $window;
  var stageW;
  var stageH;

  var isMotion;

  /*
   * サーバへ接続
   */
  openWebSocket = function() {
    applican.webSocket.open("ws://echo.websocket.org",
      webSocketOnOpen,
      webSocketOnMessage,
      webSocketOnClose,
      webSocketOnError
    );
  };

  /*
   * サーバとの接続完了時のコールバック
   */
  webSocketOnOpen = function() {
    var dump = "サーバとの接続が完了しました。\n";
    document.getElementById("dumpAreaWebSocket").value = dump;
  };

  /*
   * メッセージ受信時のコールバック
   */
  webSocketOnMessage = function(event) {
    alert("メッセージ受信が完了しました。", function() {}, "", "ok");
    var dump = "メッセージ受信が完了しました。\n";
    dump    += event.data + "\n";
    document.getElementById("dumpAreaWebSocket").value = dump;
  };

  /*
   * サーバとの切断時のコールバック
   */
  webSocketOnClose = function() {
    var dump = "サーバとの接続を切断しました。\n";
    document.getElementById("dumpAreaWebSocket").value = dump;
  };

  /*
   * エラー発生時のコールバック
   */
  webSocketOnError = function(event) {
    var dump = "エラーが発生しました。\n";
    dump    += event.data + "\n";
    document.getElementById("dumpAreaWebSocket").value = dump;
  };

  /*
   * メッセージを送信
   */
  sendWebSocket = function() {
    var data = document.getElementById("msg").value;
    if (!data) {
      data = "TEST_MESSAGE";
    }
    applican.webSocket.send(data);
    alert("メッセージを送信しました。", function() {}, "", "ok");
  };

  /*
   * サーバから切断
   */
  closeWebSocket = function() {
    applican.webSocket.close();
  };

  /********************* イベント登録 *********************/
  document.addEventListener("deviceready", function() {
    // 「open」ボタン押下処理
    document.getElementById("openWebSocketBtn").addEventListener("touchend", openWebSocket, false);
    // 「メッセージ送信」ボタン押下処理
    document.getElementById("sendWebSocketBtn").addEventListener("touchend", sendWebSocket, false);
    // 「close」ボタン押下処理
    document.getElementById("closeWebSocketBtn").addEventListener("touchend", closeWebSocket, false);
  }, false);







  $(function () {
    $arrow = $("#arrow");
    $window = $(window);

    isMotion = false;

    $(window).on("resize", resizeHandler);
    resizeHandler();

    // DeviceMotion Event
    window.addEventListener("devicemotion", devicemotionHandler);
  });

  // 加速度が変化
  function devicemotionHandler(event) {
    if (isMotion) return;

    // 加速度
    // X軸
    var x = event.acceleration.x;
    // Y軸
    var y = event.acceleration.y;
    // Z軸
    var z = event.acceleration.z;

    $arrow.stop();

    var l = 7;
    if (x > l) { // 右
      $arrow.css({
        x: -stageW
      });
      $arrow.children("img").css({
        "-webkit-transform": "rotate(90deg)",
        "-moz-transform": "rotate(90deg)",
        "transform": "rotate(90deg)"
      });
    }
    else if (x < -l) { // 左
      $arrow.css({
        x: stageW
      });
      $arrow.children("img").css({
        "-webkit-transform": "rotate(-90deg)",
        "-moz-transform": "rotate(-90deg)",
        "transform": "rotate(-90deg)"
      });
    }
    else if (y > l) { // 上
      $arrow.css({
        y: stageH
      });
      $arrow.children("img").css({
        "-webkit-transform": "rotate(0deg)",
        "-moz-transform": "rotate(0deg)",
        "transform": "rotate(0deg)"
      });
    }
    else if (y < -l) { // 下
      $arrow.css({
        y: -stageH
      });
      $arrow.children("img").css({
        "-webkit-transform": "rotate(180deg)",
        "-moz-transform": "rotate(180deg)",
        "transform": "rotate(180deg)"
      });
    }
    else return;

    isMotion = true;

    $arrow.delay(500).transition({x: 0, y: 0}, 300, "easeOutCubic", function () {
      isMotion = false
    });
  }

  function resizeHandler(event) {
    stageW = $window.width();
    stageH = $window.height();
  }
})();