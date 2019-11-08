<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header>
            <div class="logo">
                <img src="../assets/logo.png" alt="Logo" width="30">
            </div>
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">Transition</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item>Transition</a-breadcrumb-item>
            </a-breadcrumb>
            <div v-for="blog in blogList" :key="blog.id"
                 :style="{ background: '#fff', padding: '24px', minHeight: '70vh' }">
                <markdown-it-vue class="md-body" :content="blog.body"/>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2019
        </a-layout-footer>
    </a-layout>
</template>
<style>
    #components-layout-demo-top .logo {
        width: 120px;
        height: 31px;
        float: left;
    }
</style>

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
                this.blogList = rep.data;
            });
        },
        methods: {}
    }
</script>

<style scoped>

</style>