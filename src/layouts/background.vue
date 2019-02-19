<template>
    <div class="bg-tree">
        <div class="tree-container">
            <!--<img src="../img/login-bg.png">-->
        </div>
        <div class="mark">

        </div>
    </div>
</template>


<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .bg-tree {
        position: absolute;
        z-index: -1;
        width: 100%;
        top: 0;
        bottom: 0;
        min-height: 100vh;
        background-image: url('../img/background.jpg');
        background-size: 100%;
        .tree-container {
            position: absolute;
            z-index: 0;
            bottom: 0;
            width: 100%;
            img {
                display: block;
                width: 100%;
            }
        }
        .mark {
            display: none;
            position: absolute;
            width: 100%;
            height: 90%;
            bottom: 0;
            background: rgba(255,255,255,0);
            background: linear-gradient(rgba(255,255,255,0),
                    rgba(255,255,255,1) 38%,
                    rgba(255,255,255,1) 78%,
                    rgba(255,255,255,0.25) 90%,
                    rgba(255,255,255,0))
        }
        .signUpPage & .mark {
            display: block;
        }
    }
</style>
