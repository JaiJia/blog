<template>
    <a-layout id="home-page" class="layout home-page">
        <a-spin class="loading" v-if="isLoading" size="large"></a-spin>

        <a-layout v-if="!isLoading">
            <aside class="aside">
                <div class="personal-info">
                    <img src="../assets/logo.png" alt="Profile Photo" width="120">
                    <h3>Jaco</h3>
                    <p>NM$L 🍻</p>
                </div>
                <div v-if="currentLabelObj.name">
                    <a-button class="blog-info__label" type="danger" @click="filterByLabel()"
                              :style="{ backgroundColor: '#' + currentLabelObj.color}">
                        {{currentLabelObj.name}}<a-icon type="close"></a-icon>
                    </a-button>
                </div>
            </aside>
            <a-layout-content class="content-wrap">
                <section class="blog-list">
                    <div v-for="blog in blogList" :key="blog.id">
                        <h2 class="blog-title" @click="linkToDetail(blog)">{{blog.title}}</h2>
                        <markdown-it-vue class="md-body blog-body" :content="blog.abstract"/>
                        <div class="blog-info">
                            <span class="blog-info__time">{{blog.created_at | sliceStr(10)}}</span>
                            <a class="blog-info__label" v-for="label in blog.labels" :key="label.id"
                               :style="{ backgroundColor: '#' + label.color}"
                               @click="filterByLabel(label)">{{label.name}}</a>
                        </div>
                    </div>
                </section>
                <a-pagination v-model="currentPage" @change="changeList" :total="totalBlogNumber"
                              :showTotal="total => `Total ${total} items`" style="margin-top: 20px;"></a-pagination>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import MarkdownItVue from 'markdown-it-vue';
    import 'markdown-it-vue/dist/markdown-it-vue.css';
    import api from '../services/api';

    export default {
        name: 'HomePage',
        components: {
            MarkdownItVue
        },
        data() {
            return {
                isLoading: false,
                originBlogList: [],
                blogList: [],
                currentLabelObj: {},
                allLabels: [],
                currentPage: 1,
                totalBlogNumber: 0,
            }
        },
        created() {
            this.currentPage = 1;
            this.loadData();
        },
        filters: {
            sliceStr(str, len) {
                return str.slice(0, len);
            }
        },
        methods: {
            loadData() {
                this.isLoading = true;
                api.getBlogList().then(data => {
                    let tempLabels = [];
                    this.originBlogList = data.map(blogItem => {
                        const blogAbstract = blogItem.body.split('\n').slice(0, 12);
                        tempLabels = tempLabels.concat(blogItem.labels);
                        return Object.assign({
                            abstract: blogAbstract.join('\n'),
                        }, blogItem);
                    });
                    this.allLabels = [...new Set(tempLabels)];
                    this.changeList(this.currentPage);
                    this.totalBlogNumber = this.originBlogList.length;
                }).finally(() => {
                    this.isLoading = false;
                });
            },
            changeList(page) {
                const startIndex = page > 1 ? (page - 1) * 10 - 1 : 0;
                if (this.currentLabelObj.name) {
                    this.blogList = this.blogList.slice(startIndex, startIndex + 10);
                } else {
                    this.blogList = this.originBlogList.slice(startIndex, startIndex + 10);
                }
            },
            linkToDetail(blog) {
                this.$router.push({
                    name: 'BlogDetail',
                    params: {
                        number: blog.number,
                        blogDetail: blog
                    }
                })
            },
            filterByLabel(label = {}) {
                if (label.name === this.currentLabelObj.name) {
                    return;
                }
                this.currentLabelObj = label;
                this.currentPage = 1;
                if (!label.name) {
                    this.changeList(this.currentPage);
                    this.totalBlogNumber = this.originBlogList.length;
                } else {
                    this.isLoading = true;
                    this.axios.get(`https://api.github.com/repos/jaijia/blog/issues?labels=${label.name}`).then(rep => {
                        this.blogList = rep.data.map(blogItem => {
                            const blogAbstract = blogItem.body.split('\n').filter(item => {
                                return item !== '';
                            }).slice(0, 10);
                            return Object.assign({
                                abstract: blogAbstract.join('\n'),
                            }, blogItem);
                        });
                        this.totalBlogNumber = this.blogList.length;
                    }).finally(() => {
                        this.isLoading = false;
                    });
                }
            },
        }
    }
</script>
