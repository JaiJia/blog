<template>
    <a-layout id="home-page" class="layout home-page">
        <a-layout-header class="header">
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" width="30">
            </div>
            <a-menu theme="dark" mode="horizontal" style="line-height: 64px;">
                <a-menu-item key="1">Home</a-menu-item>
            </a-menu>
        </a-layout-header>
        <aside class="aside">
            <img src="../assets/logo.png" alt="Profile Photo" width="120">
            <h3>Jaco</h3>
            <p>NM$L 🍻</p>
        </aside>
        <a-layout-content class="content-wrap">
            <section class="blog-list">
                <div v-for="blog in blogList" :key="blog.id">
                    <h2 class="blog-title">{{blog.title}}</h2>
                    <markdown-it-vue class="md-body blog-body" :content="blog.abstract"/>
                    <div class="blog-info">
                        <span class="blog-info__time">{{blog.created_at | sliceStr(10)}}</span>
                        <a class="blog-info__label"
                           :style="{ backgroundColor: '#' + label.color}"
                              v-for="label in blog.labels" :key="label.id">{{label.name}}</a>
                    </div>
                </div>
            </section>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2019
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import MarkdownItVue from 'markdown-it-vue';
    import 'markdown-it-vue/dist/markdown-it-vue.css';
    export default {
        name: "HomePage",
        components: {
            MarkdownItVue
        },
        data() {
            return {
                blogList: [],
            }
        },
        created() {
            this.axios.get('https://api.github.com/repos/jaijia/blog/issues').then(rep => {
                this.blogList = rep.data.map(blogItem => {
                    const blogAbstract = blogItem.body.split('\n').filter(item => {
                        return item !== '';
                    }).slice(0, 10);
                    return Object.assign({
                        abstract: blogAbstract.join('\n'),
                    }, blogItem);
                });
            });
        },
        filters: {
            sliceStr(str, len) {
                return str.slice(0, len);
            }
        },
        methods: {}
    }
</script>

<style>
    .header {
        display: flex;
        align-items: center;
    }

    .logo {
        margin: 5vw;
    }

    .aside {
        position: absolute;
        left: 100px;
        top: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content-wrap {
        max-width: 1200px;
        margin: 0 auto;
    }

    .blog-list {
        min-height: 80vh;
        padding: 20px;
        background-color: #fff;
    }

    .blog-title {
        font-size: 24px;
        line-height: 2;
    }

    .blog-body {
        padding: 10px;
        background-color: #f5f5f5;
    }

    .blog-info {
        height: 40px;
        line-height: 40px;
    }

    .blog-info__time {
        color: #666;
    }

    .blog-info__label {
        display: inline-block;
        padding: 0 8px;
        margin: 0 10px;
        height: 20px;
        line-height: 20px;
        color: #000;
        font-weight: bold;
    }

    @media only screen and (max-width: 500px) {
        .aside {
            display: none;
        }

        .content-wrap {
            padding: 0;
        }
    }

</style>