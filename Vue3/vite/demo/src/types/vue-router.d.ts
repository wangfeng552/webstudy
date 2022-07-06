import { type RouteMeta as VRouteMeta } from "vue-router";

// 这是覆盖原生声明文件的样例
declare module "vue-router" {
  interface RouteMeta extends VRouteMeta {
    /** 标题 */
    title: string;
    /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */
    type?: 0 | 1 | 2;
    /** 当前路由权限 */
    // perms?: PermissionType[];
    /** 是否需要缓存 */
    keepAlive?: boolean;
    /** 当前路由namePath 祖先name集合 */
    namePath?: string[];
    /** 当前路由所在的完整路径 */
    fullPath?: string;
    /** 是否固定在标签栏 */
    affix?: boolean;
    /** 菜单图标 */
    icon?: string;
    /** 当前页面切换动画 */
    transitionName?: string;
    /** 不在菜单中显示 */
    hideInMenu?: boolean;
    /** 不在面包屑导航中显示 */
    hideInBreadcrumb?: boolean;
    /** 不在tab标签页中显示 */
    hideInTabs?: boolean;
    /** 设置当前路由高亮的菜单项，值为route fullPath或route name,一般用于详情页 */
    activeMenu?: string;
    /** 菜单排序号 */
    orderNum?: number;
    isLink?: boolean;
  }
}
