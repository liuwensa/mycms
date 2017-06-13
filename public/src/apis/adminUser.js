/**
 * Created by admin on 2017/3/17.
 */

import {get, post, put, del} from './helper';

export const getAdminUsers = get.bind(null, '/adminapi/users');
export const delAdminUser = del.bind(null, '/adminapi/users');
export const addAdminUser = post.bind(null, '/adminapi/users');
export const updateAdminUser = put.bind(null, '/adminapi/users');

export const logout = get.bind(null, '/admin/logout');
