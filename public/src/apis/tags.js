/**
 * Created by admin on 2017/3/17.
 */

import {get, post, put, del} from './helper';

export const getTags = get.bind(null, '/adminapi/tags');
export const delTags = del.bind(null, '/adminapi/tags');
export const addTags = post.bind(null, '/adminapi/tags');
export const updateTags = put.bind(null, '/adminapi/tags');
