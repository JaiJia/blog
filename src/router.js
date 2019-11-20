import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage';
import BlogDetail from './components/BlogDetail';
import PostBlog from './components/PostBlog';
import ManageBlog from './components/ManageBlog';

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
    {
        path: '/post/:number',
        name: 'PostBlog',
        component: PostBlog,
        props: true,
    },
    {
        path: '/manage',
        name: 'ManageBlog',
        component: ManageBlog,
    }
];

export default new VueRouter(
    { routes }
);
