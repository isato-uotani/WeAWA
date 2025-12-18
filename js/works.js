//　ページ内のHTMLが全て読み込まれた後にスクリプトを実行
document.addEventListener("DOMContentLoaded", () => {
  //　.gallery要素とその中にある.img-box要素の取得
  const gallery = document.querySelector(".gallery");
  //　Array.from()で.galleryを配列に変換する
  // ↪️querySelevotrAllで取得した返り値は「NodeList」になり
  // そのままでは配列メソッドが使用できないため
  // ”Array.from”を使用して配列オブジェクトに変換する。
  const items = Array.from(gallery.querySelectorAll(".img-box"));
  //　ページボタンエリアの取得
  const pagination = document.querySelector(".pagination");

  //---------ページ関連の変数を設定---------//

  //　1ページに表示する枚数の指定
  const itemsPerPage = 8;
  //　全アイテム数 ÷（itemsPerPage = 8）でページ数を算出
  //　”Math.ceil”は端数を切り上げる関数
  const totalPages = Math.ceil(items.length / itemsPerPage);

  let currentPage = 1;

  //---------ページ切り替えの設定---------//

  //　今のページの画像だけをアニメーション付きで表示する関数
  function showPage(page) {
    // 表示するギャラリーを都度リセットして処理の安定化を図る
    gallery.innerHTML = "";
    // start変数をページにアイテム数”8”をかけた値にする
    const start = (page - 1) * itemsPerPage;
    // end変数をstart変数にさらにアイテム数”8”を足すことで
    // 2ページ目が9〜16、3ページ目が17〜24を表示するように指定
    const end = start + itemsPerPage;
    //　”.slice()”で”pageItems”に取り出した配列のみを生成
    const pageItems = items.slice(start, end);

    //　各アイテムをクローンしてギャラリーに追加
    // clone = HTMLのimg要素を完全コピーしてjsに引用
    pageItems.forEach((item, index) => {
      const clone = item.cloneNode(true);
      gallery.appendChild(clone);
      //　画像に.showクラスを付与することで、CSSのフェードインアニメーションを順番に発生させる。
      setTimeout(() => {
        clone.querySelector("img").classList.add("show");
      }, 200 * index); // indexごとに0.2秒の遅延設定。
    });

    updatePagination(page);
  }

  //---------ページネーション更新の設定---------//

  //　ページボタンの自動生成
  //　各ボタンをクリックすると対応ページを表示させる
  function updatePagination(page) {
    // これがないとボタンを押すたびに新しいボタンが生成される
    pagination.innerHTML = "";
    //　”totalPages”は1ページに表示する画像数を指定した変数
    // ”totalPages”が5ページなら1〜5を順番にボタン化する
    for (let i = 1; i <= totalPages; i++) {
      //　buttonを生成するbutton変数を指定
      // <button>1</button>, <button>2</button> ... という具合に生成
      const button = document.createElement("button");
      button.textContent = i;
      // active付与し、現在ページボタンの色を変更（強調）
      if (i === page) button.classList.add("active");
      // ボタンがクリックされると、該当ページを表示
      button.addEventListener("click", () => showPage(i));
      // .pagination 要素内に実際にボタンを並べる
      pagination.appendChild(button);
    }
  }

  //-------スマホ用：全アイテムを一括表示--------//

  function showAllItems() {
    gallery.innerHTML = "";
    items.forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.querySelector("img").classList.remove("show");
      gallery.appendChild(clone);

      // フェードインを適用する
      setTimeout(() => {
        clone.querySelector("img").classList.add("show");
      }, 100 * index); // 0.1秒間隔
    });

    //　ページネーションを非表示設定
    pagination.style.display = "none";
  }

  //-------条件分岐と初期化--------//

  function setupGallery() {
    const width = window.innerWidth;

    // 768pxを条件に画面切り替え
    if (width <= 768) {
      // スマホの場合 → ページネーションなし
      showAllItems();
    } else {
      // PCの場合 → ページネーションあり
      pagination.style.display = "flex";
      showPage(currentPage);
    }
  }

  //　初回読み込み時の判定
  setupGallery();

  // 画面サイズが変わった時も再チェック
  window.addEventListener("resize", setupGallery);
});

//画像POPUP
$(function () {
  $("img-box a").colorbox();
});

//----------subnavのページ読み込み----------//

document.addEventListener("DOMContentLoaded", () => {
  const subLinks = document.querySelectorAll(".sub a");

  subLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = e.target.textContent.trim().toLowerCase();

      // ページをリロードせず動的に切り替える例
      fetch(`/data/${category}.json`)
        .then((res) => res.json())
        .then((data) => {
          const gallery = document.querySelector(".gallery");
          gallery.innerHTML = "";

          data.images.forEach((src, index) => {
            const div = document.createElement("div");
            div.classList.add("img-box");
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${category}${index}`;
            img.classList.add("item", "fade-in");
            div.appendChild(img);
            gallery.appendChild(div);
          });

          // ページネーション再生成（別関数呼び出し）
          const event = new Event("DOMContentLoaded");
          document.dispatchEvent(event);
        });
    });
  });
});
