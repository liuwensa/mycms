/**
 * Created by admin on 2017/3/17.
 */

import {get, post, put, del} from './helper';

export const getContents = get.bind(null, '/adminapi/content');
export const delContents = del.bind(null, '/adminapi/content');
export const addContents = post.bind(null, '/adminapi/content');
export const updateContents = put.bind(null, '/adminapi/content');
export const getContent = get.bind(null, '/adminapi/content');
