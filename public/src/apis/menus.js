/**
 * Created by admin on 2017/6/14.
 */

import {get, post, put, del} from './helper';

export const getMenus = get.bind(null, '/adminapi/menus');
export const delMenus = del.bind(null, '/adminapi/menus');
export const addMenus = post.bind(null, '/adminapi/menus');
export const updateMenus = put.bind(null, '/adminapi/menus');
