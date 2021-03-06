<template>
    <section class="post-blog content-wrap">
        <a-form :form="form" @submit="postNew">
            <a-form-item label="Title" :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }">
                <a-input v-decorator="['title', { rules: [{ required: true, message: 'Please input your title!' }] }]"></a-input>
            </a-form-item>
            <a-form-item label="Body" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                <mavon-editor class="edit-body" v-model="blogBody"></mavon-editor>
            </a-form-item>
            <a-form-item label="Labels" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                <a-input v-decorator="['labels', { rules: [{ required: true, message: 'Please input your labels!' }] }]"></a-input>
            </a-form-item>
            <a-button class="submit-btn" type="primary" html-type="submit" shape="round" size="large" :disabled="isLoading">
                Submit<a-icon type="man"></a-icon>
            </a-button>
        </a-form>
    </section>
</template>

<script>
    import Vue from 'vue';
    import mavonEditor from 'mavon-editor';
    import api from '../services/api';
    import 'mavon-editor/dist/css/index.css';

    Vue.use(mavonEditor);

    export default {
        name: 'PostBlog',
        props: ['number', 'blogDetail'],
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
                blogBody: '',
                isLoading: false,
                isEdit: false,
            };
        },
        created() {
            if (this.blogDetail) {
                this.isEdit = true;
                this.form.getFieldDecorator('title', {initialValue: this.blogDetail.title});
                this.form.getFieldDecorator('labels', {initialValue: this.blogDetail.labels.map(item => item.name).join(',')});
                this.blogBody = this.blogDetail.body;
            } else if (this.number) {
                this.isEdit = true;
                api.getBlogDetail(this.number).then(data => {
                    this.form.getFieldDecorator('title', {initialValue: data.title});
                    this.form.getFieldDecorator('labels', {initialValue: data.labels.map(item => item.name).join(',')});
                    this.blogBody = data.body;
                });
            }
        },
        methods: {
            postNew(e) {
                e.preventDefault();
                const that = this;
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.isLoading = true;
                        const hideLoading = this.$message.loading('Requesting...');
                        this.axios.post('https://api.github.com/repos/jaijia/blog/issues', {
                            title: values.title,
                            body: this.blogBody,
                        }, {
                            headers: {
                                'Authorization': 'token ' + window.authArr.join(''),
                            },
                        }).then((rep) => {
                            api.addLabels(that.isEdit, rep.data.number, values.labels);
                            that.$message.success('Post Successfully!');
                            that.form.resetFields();
                            that.$router.push({
                                name: 'HomePage',
                            });
                        }, err => {
                            that.$message.error(`Error: ${err.response.data.message}`);
                        }).finally(() => {
                            that.isLoading = false;
                            hideLoading();
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .post-blog {
        min-height: calc(100vh - 128px);
        padding: 20px;
        overflow: hidden;
    }

    .edit-body {
        min-height: 60vh;
    }

    .submit-btn {
        float: right;
        right: 20px;
        margin-top: 20px;
    }
</style>