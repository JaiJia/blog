<template>
    <section class="blog-detail content-wrap">
        <h2 class="blog-title">{{blog.title}}</h2>
        <article class="blog-body">
            <markdown-it-vue class="md-body blog-body" :content="blog.body"/>
        </article>
    </section>
</template>

<script>
    import MarkdownItVue from 'markdown-it-vue';
    import 'markdown-it-vue/dist/markdown-it-vue.css';

    export default {
        name: 'BlogDetail',
        props: ['number', 'blogDetail'],
        components: {
            MarkdownItVue
        },
        data() {
            return {
                blog: {}
            };
        },
        created() {
            if (this.blogDetail) {
                this.blog = this.blogDetail;
            } else {
                this.axios.get(`https://api.github.com/repos/jaijia/blog/issues/${this.number}`).then(rep => {
                    this.blog = rep.data;
                });
            }
        }
    }
</script>

<style scoped>

</style>