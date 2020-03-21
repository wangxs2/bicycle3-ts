import router from './router/index';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({
  showSpinner: false,
});
console.log(screen.availWidth,screen.availHeight)
console.log(screen.width,screen.height)
let num=1
router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();
  if(num==1){
    window.document.documentElement.setAttribute("data-theme","default")
  }else{
    window.document.documentElement.setAttribute("data-theme","bigFull")
  }
  next();
});

router.afterEach((to, from) => {
  // 进度条结束
  NProgress.done();
});
