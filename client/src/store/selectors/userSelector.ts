
import { StateAppType } from '../redux-store';

export const profileSelector =(state:StateAppType)=>state.user.currentUser;
export const profileIDSelector =(state:StateAppType)=>state.user.currentUser._id;
export const errorSelector =(state:StateAppType)=>state.user.error;
export const loadingSelector =(state:StateAppType)=>state.user.loading;
export const newUserSelector =(state:StateAppType)=>state.user.newUser;

export const allUsersSelector = (state:StateAppType)=>state.user.allUsers;
export const enjoyedUserSelector = (state: StateAppType) => state.user.enjoyedUser;


