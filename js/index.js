/*スライドショーのjs*/

let current = 0;
const slides = document.querySelectorAll(".slide");
const interval = 5000; /*5秒おきにスライド*/

function shownextslide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(shownextslide, interval);

// introが終わったらmainに移る。
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const video = document.getElementById("introVideo");
  const GIF_DURATION = 5 * 1000;
  const main = document.getElementById("main-content");
  //イベントの付与(イントロが終わったら非表示にしてトップページを表示)
  setTimeout(() => {
    intro.style.display = "none";
  }, GIF_DURATION);
});

// 各ページのOPとメインとの切り替え
document.addEventListener("DOMContentLoaded", () => {
  const opening = document.getElementById("opening");
  const op = document.getElementById("op");
  const main = document.getElementById("main");

  // メインは最初は隠しておく
  main.style.opacity = "0";

  // アニメーション終了を検知
  op.addEventListener("animationend", () => {
    // intro をフェードアウト
    opening.style.transition = "opacity 0.8s ease";
    opening.style.opacity = "0";

    // 完全に消えてから非表示
    setTimeout(() => {
      opening.style.display = "none";

      // メインをフェードイン
      main.style.transition = "opacity 1s ease";
      main.style.opacity = "1";
    }, 500);
  });
});
