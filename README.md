[![Juliette Logo](https://i.ibb.co/jDs1CB3/juliette-logo.jpg)](https://github.com/stanimirovic/juliette)

# Juliette &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![NPM Version](https://badge.fury.io/js/juliette.svg)](https://badge.fury.io/js/juliette) [![Downloads](https://img.shields.io/npm/dt/juliette.svg)](https://github.com/stanimirovic/juliette)

**Reactive State Management Powered by [RxJS](https://rxjs-dev.firebaseapp.com/)**

## Table of Contents

- [Description](#description)
  - [Reduced Boilerplate Without Reducer's Ifology](#reduced-boilerplate-without-reducers-ifology)
  - [Simplified Configuration](#simplified-configuration)
  - [Framework Agnostic](#framework-agnostic)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
  - [Handlers](#handlers)
  - [Store](#store)
  - [Effects](#effects)
  - [Angular Integration](#angular-integration)
  - [React Integration](#react-integration)
- [Quick Start with Angular](#quick-start-with-angular)
- [Quick Start with React](#quick-start-with-react)
- [License](#license)

## Description

Juliette is a reactive state management library inspired by [NgRx](https://ngrx.io/).
It reduces Redux boilerplate, eliminates reducer's conditional branching, simplifies
the configuration and introduces NgRx architecture into the framework-agnostic world.
Juliette is a TypeScript friendly library and can be used in Angular, React or any JavaScript application.

### Reduced Boilerplate Without Reducer's Ifology

Juliette reduces Redux boilerplate by merging action and reducer into one component called handler.
To better understand the benefits of handler, let's first look at how actions and reducers are defined by using NgRx.

<details>
  <summary><b>Old NgRx Approach</b></summary>

```typescript
// users.actions.ts

export const FETCH_USERS = '[Users] Fetch Users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch Users Success';
export const FETCH_USERS_ERROR = '[Users] Fetch Users Error';

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class FetchUsersSuccess implements Action {
  readonly type = FETCH_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class FetchUsersError implements Action {
  readonly type = FETCH_USERS_ERROR;
}

export type Action = FetchUsers | FetchUsersSuccess | FetchUsersError;

// users.reducer.ts

import * as UsersActions from './users.actions';

export interface State {
  users: User[];
  showLoading: boolean;
}

const initialState: State = {
  users: [],
  showLoading: false,
};

export function reducer(state = initialState, action: UsersActions.Action): State {
  switch (action.type) {
    case UsersActions.FETCH_USERS:
      return { ...state, showLoading: true };
    case UsersActions.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, showLoading: false };
    case UsersActions.FETCH_USERS_ERROR:
      return { ...state, users: [], showLoading: false };
    default:
      return state;
  }
}
```
</details>

TypeScript code above shows the old NgRx syntax and it is pretty similar to traditional Redux approach.
As you can see, it's too much code for three simple actions. Then, NgRx team introduced a new way
to define actions and reducers.

<details>
  <summary><b>New NgRx Approach</b></summary>
  
```typescript
// users.actions.ts

export const fetchUsers = createAction('[Users] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[Users] Fetch Users Success',
  props<{ users: User[] }>()
);
export const fetchUsersError = createAction('[Users] Fetch Users Error');

// users.reducer.ts

import * as UsersActions from './users.actions';

export interface State {
  users: User[];
  showLoading: boolean;
}

const initialState: State = {
  users: [],
  showLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.fetchUsers, state => ({ ...state, showLoading: true })),
  on(UsersActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    showLoading: false,
  })),
  on(UsersActions.fetchUsersError, state => ({
    ...state,
    users: [],
    showLoading: false,
  })),
);
````
</details>

As you can see, less code is needed to define the same logic. Conditional branching for actions
in the reducer is masked by the `on` operator, but it is still present. Let's now look at how
the same example is implemented using Juliette handlers.

<details>
  <summary><b>Juliette Approach</b></summary>

```typescript
// users.handlers.ts

export const stateKey = 'users';

export interface State {
  users: User[];
  showLoading: boolean;
}

export const initialState: State = {
  users: [],
  showLoading: false,
};

export const fetchUsers = createHandler<State>(
  '[Users] Fetch Users',
  stateKey,
  state => ({ ...state, showLoading: true })
);
export const fetchUsersSuccess = createHandler<State, { users: User[] }>(
  '[Users] Fetch Users Success',
  stateKey,
  (state, { users }) => ({ ...state, users, showLoading: false }),
);
export const fetchUsersError = createHandler<State>(
  '[Users] Fetch Users Error',
  stateKey,
  state => ({ ...state, users: [], showLoading: false }),
);
````
</details>

### Simplified Configuration

You don't need to register reducers to the store anymore!

### Framework Agnostic

Core features of Juliette are implemented in pure TypeScript without framework dependencies.
Framework specific stuff is located in separated libraries.

## Architecture

![Juliette Architecture](https://i.ibb.co/yYS27T4/juliette-architecture.png)

## Installation

Run `npm install --save juliette` to install core Juliette library.

If you are using Angular, install additional package by running `npm install --save juliette-ng` command.

If you are using React, install additional package by running `npm install --save juliette-react` command.

## Usage

### Handlers

### Store

### Effects

### Angular Integration

### React Integration

## Quick Start with Angular

## Quick Start with React

## License

Juliette is [MIT licensed](./LICENSE).

Copyright © 2020 Marko Stanimirović
