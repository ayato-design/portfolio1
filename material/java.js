// スムーススクロール(元：WEBデザインMATOME)
$(function() {
  $('a[href^="#"]').on('click', function(e) {
    const href = $(this).attr('href');
    // 空の # は無視
    if (href === "#") return;
    // 対象要素が存在しない場合も無視
    const $target = $(href);
    if ($target.length === 0) return;
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 500, 'linear');
  });
});

// 戻るボタン(元：SACOCHAN-DESIGN.COM)
$(document).ready(function () {
    const pagetopBtn = $(".back_button");

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) { // 100pxスクロールしたら表示
            pagetopBtn.addClass("is-show"); // 100px以上スクロールしたらボタンをフェードイン
        } else {
            pagetopBtn.removeClass("is-show"); // 100px以下になったらボタンをフェードアウト
        }
    });

    pagetopBtn.on("click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, 800); //500ミリ秒かけて戻る
        return false;
    });
});

// ハンバーガーメニュー(元：Claude)
const btn = document.querySelector('.sm_nav_open');
const nav = document.querySelector('#sm_nav_box');
const FADE_MS = 400; // CSSの opacity .4s と合わせる

const setOpen = (open) => {
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  nav.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

btn.addEventListener('click', () =>
  setOpen(btn.getAttribute('aria-expanded') !== 'true'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setOpen(false);
});

// 項目タップ → フェードアウトしてから遷移
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#') || link.target === '_blank' ||
        e.metaKey || e.ctrlKey || e.shiftKey) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    nav.classList.add('is-fading');
    setTimeout(() => { location.href = link.href; }, FADE_MS);
  });
});

// 「戻る」で復元されたときの後始末
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    nav.classList.remove('is-fading');
    setOpen(false);
  }
});