$(function () {
  // 모바일 메뉴 토글 기능
  $(".mobile_menu_btn").on("click", function () {
    $("#gnb_menu").toggleClass("active");
  });

  // 화면 크기 변경 감지
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      $("#gnb_menu").removeClass("active").css("display", "");
    }
  });

  // 스크롤 시 네비게이션 바 고정
  var $gnb = $(".gnb_all");
  var gnbOffset = $gnb.offset() ? $gnb.offset().top : 0;

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > gnbOffset) {
      $gnb.addClass("gnb_fixed");
      $("body").css("padding-top", $gnb.outerHeight());
    } else {
      $gnb.removeClass("gnb_fixed");
      $("body").css("padding-top", 0);
    }
  });
});







