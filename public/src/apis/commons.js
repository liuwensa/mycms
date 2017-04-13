/**
 * Created by admin on 2017/4/13.
 */

import {get, post, postForm, put, del} from './helper';

export const uploadImage = postForm.bind(null, '/admin/upload/images');
