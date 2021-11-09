/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-default */
import { default as Add } from './Add';
import Sort from './Sort';
import { default as List } from './List';
import { default as ClockComp } from './Clock';
import { default as Notify } from './Notification';
import Load from './Loading';
import * as Bookmark from './Bookmark';
import * as Completed from './Completed';
import * as Priority from './Priority';
import * as Clocks from './ClockIcons';

export const AddTask = Add;
export const ListTask = List;
export const Clock = ClockComp;
export const Notification = Notify;
export const Loading = Load;
export const SortTask = Sort;

export const Icons = {
    ...Bookmark,
    ...Completed,
    ...Priority,
    ...Clocks,
};
