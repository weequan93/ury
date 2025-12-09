import './index.css';
import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from './router';
import { FrappeApp } from 'frappe-js-sdk';  // Import FrappeApp for auth

const app = createApp(App);

// Initialize FrappeApp and auth
const url = window.location.origin;
const frappe = new FrappeApp(url);
const auth = frappe.auth();  // Create auth instance

// Provide auth globally for injection in components
app.provide('$auth', auth);

// Plugins
app.use(router);

// Global Properties,
// components can inject this

// Configure route gaurds
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => !record.meta.isLoginPage)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.isLoggedIn) {
			next({ name: 'Login', query: { route: to.path } });
		} else {
			next();
		}
	} else {
		if (auth.isLoggedIn) {
			next({ name: 'Home' });
		} else {
			next();
		}
	}
});

app.mount("#app");
