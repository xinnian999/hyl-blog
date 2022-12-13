wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: "wxff4f410721541a1967", // 必填，公众号的唯一标识
  timestamp: "",
  nonceStr: "", // 必填，生成签名的随机串
  signature: "", // 必填，签名，见附录1
  jsApiList: [
    "checkJsApi",
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo",
  ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function () {
  // 分享到朋友圈
  wx.onMenuShareTimeline({
    title: "wstitle",
    link: "wslink",
    imgUrl: "wsimg",
    success: function () {
      alert("分享成功");
    },
    cancel: function () {},
  });
});
