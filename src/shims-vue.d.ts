import Vue from 'vue'
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $https: any;
    $urls: any;
    $Message: any;
    $Modal: any;
    $echarts: echarts;
    readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[] | HTMLElement | HTMLElement[] };
  }
}
