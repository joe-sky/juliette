import { User } from '../../core/models/user.model';
import { createHandler } from 'juliette';

export const featureKey = 'users';

export interface State {
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  users: [],
  loading: false,
};

export const fetchUsers = createHandler<State>('[Users] Fetch Users', featureKey, state => ({
  ...state,
  loading: true,
}));

export const fetchUsersSuccess = createHandler<State, { users: User[] }>(
  '[Users] Fetch Users Success',
  featureKey,
  (state, { users }) => ({ ...state, users, loading: false }),
);
