/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-default */
import { default as Add } from './Add';
import { default as List } from './List';
import * as Bookmark from './Bookmark';
import * as Completed from './Completed';
import * as Priority from './Priority';

export const AddTask = Add;
export const ListTask = List;

export const Icons = {
    ...Bookmark,
    ...Completed,
    ...Priority,
};
