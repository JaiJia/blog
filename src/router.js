import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage';
import BlogDetail from './components/BlogDetail';
import PostBlog from './components/PostBlog';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/detail/:number',
        name: 'BlogDetail',
        component: BlogDetail,
        props: true,
    },
    {
        path: '/post',
        name: 'PostBlog',
        component: PostBlog,
    },
];

export default new VueRouter(
    { routes }
);
