"use strict";

for (let i = 0; i < 3; i++) {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  for (let j = 0; j < 3; j++) {
    const relative = document.createElement("div");
    // classListプロパティにはaddというメソッドがある
    // メソッドもプロパティに慣れる、変数に入るものはなんでもプロパティ
    relative.classList.add("relative");
    const anaImg = document.createElement("img");
    anaImg.classList.add("ana");
    // 要素->プロパティへは.つなぎでアクセスできる
    anaImg.src = "images/穴.png";
    const moguraImg = document.createElement("img");
    moguraImg.classList.add("mogura", "uwagaki");
    relative.appendChild(anaImg);
    relative.appendChild(moguraImg);
    container.appendChild(relative);
  }
}

const moguras = document.querySelectorAll(".mogura");
var score = 0;

for (let i = 0; i < moguras.length; i++) {
  new moguraObj(moguras[i]);
}

start();
function start() {
  let interval = setInterval(() => {
    let random = Math.floor(Math.random() * 9);
    moguras[random].showMogura();
  }, 300);
  setTimeout(() => {
    clearTimeout(interval);
    alert("ゲーム終了 スコア:" + score);
  }, 30000);
}

function moguraObj(image) {
  const HIT_MOGURAS = {
    normal: "images/モグ1.png",
    abnormal: "images/モグ4.png"
  };
  const NORMAL_MOGRAS = {
    normal: "images/モグ2.png",
    abnormal: "images/モグ3.png"
  };
  const STATUS = {
    HIDE: 0,
    SHOW: 1,
    PRESS: 2
  };
  const MOGURA_TYPES = ["normal", "abnormal"];

  let moguraStatus = STATUS.HIDE;
  let moguraType;

  image.onclick = function() {
    // onclickにおいてのthisはクリックされた要素
    // imageのonclickなので、image自体がthis
    score++;
    moguraStatus = STATUS.PRESS;

    image.src = HIT_MOGURAS[moguraType];
    clearTimeout(image.autoHide);
    setTimeout(
      image => {
        //setTimeoutの第三引数に渡したものが、第一引数の引数として渡される　setTimeout(this => {this.hidemogura()},500)
        image.hideMogura();
      },
      500,
      image
    );
  };

  image.hideMogura = function() {
    moguraStatus = STATUS.HIDE;
    image.src = "";
  };

  image.showMogura = function() {
    if (moguraStatus != STATUS.HIDE) {
      //モグラが隠れていない状態（＝もぐらが出現している状態の場合は）何もしない
      return false;
    }
    moguraStatus = STATUS.SHOW;
    moguraType = MOGURA_TYPES[Math.floor(Math.random() * 2)];
    image.src = NORMAL_MOGRAS[moguraType];
    image.autoHide = setTimeout(
      image => {
        image.hideMogura();
      },
      1000 + 200 * Math.random(),
      image
    );
    return true;
  };
}
