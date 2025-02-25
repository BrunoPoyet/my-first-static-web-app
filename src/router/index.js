import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/views/Welcome.vue';

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return { top: 0, left: 0 }
	},
	routes: [
		{
			path: '/',
			component: WelcomePage,
			meta: { public: true }
		},
		{
			path: '/login',
			component: () => import('@/views/Login.vue'),
			meta: { public: true }
		},
		{
			path: '/logout',
			component: () => import('@/views/Logout.vue')
		},
		{
			path: '/dashboard',
			component: () => import('@/views/Dashboard.vue')
		},
		{
			path: '/recipes',
			name: 'Recipes',
			component: () => import('@/views/Recipes.vue')
		},
		{
			path: '/recipes/:id',
			name: 'Recipe',
			component: () => import('@/views/Recipe.vue'),
			props: true
		},
		{
			path: '/recipes/:id/update',
			name: 'RecipeUpdate',
			component: () => import('@/views/RecipeUpdate.vue'),
			props: true
		},
		{
			path: '/admin',
			component: () => import('@/views/Admin.vue')
		},
		{
			path: '/:catchAll(.*)',
			name: 'Error404',
			component: () => import('@/views/Error404.vue')
		}
	]
});

router.beforeEach((to, from) => {
	if (! to.matched.some(route => route.meta.public)) {
		// For non public pages.
		// Check auth token.
		if (! localStorage.token) {
			// Redirect to login page.
			return '/login';
		}
	}
});

export default router;
