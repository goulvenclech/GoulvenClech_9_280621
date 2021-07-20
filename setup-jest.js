import $ from 'jquery';
global.$ = global.jQuery = $;

import {localStorageMock} from "./src/__mocks__/localStorage";
export function setLocalStorage (user) {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    window.localStorage.setItem('user', JSON.stringify({ type: user, email: 'test@email.com' }))
}