/**
 * Created by admin on 2017/3/17.
 */

import {get, post, put, del} from './helper';

export const getCategory = get.bind(null, '/adminapi/category');
export const delCategory = del.bind(null, '/adminapi/category');
export const addCategory = post.bind(null, '/adminapi/category');
export const updateCategory = put.bind(null, '/adminapi/category');
