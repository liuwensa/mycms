/**
 * Created by admin on 2017/3/17.
 */

import {get, post, put, del} from './helper';

export const getAdminUsers = get.bind(null, '/adminuser/users');
export const delAdminUser = del.bind(null, '/adminuser/users');
export const addAdminUser = post.bind(null, '/adminuser/users');
export const updateAdminUser = put.bind(null, '/adminuser/users');
