import router from './router/index';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  // 进度条结束
  NProgress.done();
});
