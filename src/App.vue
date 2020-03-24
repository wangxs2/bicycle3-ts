<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
@import url("./assets/iconfont/iconfont.css");
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  width:100vw;
  height:100vh;
  overflow: hidden;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
//针对于城运的大屏。事实上是针对城运的单屏来说的，否则调成1,1就成了 或者自己在beforrouter里面调一下
.glabfont{
  font-family:Microsoft YaHei;
  transform: scale(1,1.6);
  -ms-transform: scale(1,1.6);
  -webkit-transform: scale(1,1.6);
  -moz-transform: scale(1,1.6);
  -o-transform:  scale(1,1.6);
  display:inline-block;
}
</style>
