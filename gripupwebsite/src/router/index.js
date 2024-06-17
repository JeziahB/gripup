import { createRouter, createWebHistory } from 'vue-router';
import homeView from '../views/homeView.vue';
import cartView from '../views/cartView.vue';
import productView from '../views/productView.vue';
import detailView from '../views/detailView.vue';
import checkoutView from '../views/checkoutView.vue';
import bevestigingView from '../views/bevestigingView.vue';
import buildupView from '../views/buildupView.vue';
import contactView from '../views/contactView.vue';
import termsView from "../views/termsView.vue";
import privacyView from "../views/privacyView.vue";


const routes = [
    { path: '/', component: homeView },
    { path: '/home', component: homeView },
    { path: '/cart', component: cartView },
    { path: '/product', component: productView },
    {
        path: '/product/:cardId',
        name: 'product-detail',
        component: detailView,
        props: true
    },

    { path: '/checkout', component: checkoutView },
    { path: '/bevestiging', component: bevestigingView },
    { path: '/buildup', component: buildupView },
    { path: '/contact', component: contactView },
    { path: '/terms', component: termsView },
    { path: '/privacy', component: privacyView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
