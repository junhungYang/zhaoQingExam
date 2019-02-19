var H5_evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(H5_evt, H5_resize, false);
function H5_resize(fals) {
    //设置标准屏幕可见宽度的（Iphone6+）
    var k = 375;
    if (window.orientation == 0 || window.orientation == 180) {
        //竖屏
    } else {
        //横屏
        k = 320;
    }

    // if (document.documentElement.clientWidth <= k) {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 200 + 'px';
    // } else {
    //     //这里如果屏幕可见宽度大于 标准屏幕宽度，设置标准函数宽度为375px OR 320px.
    //     document.documentElement.style.fontSize = k / 750 * 100 + 'px';
    // }
}
H5_resize(true);