<template>
  <a-layout class="content-wrap">
    <a-layout-content>
      <a-table :columns="columns" :dataSource="data" :rowKey="record => record.number">
        <span slot="labels" slot-scope="labels">
          <a-tag v-for="label in labels"
            :style="{ backgroundColor: '#' + label.color}"
            :key="label.id">{{ label.name }}</a-tag>
        </span>
        <span slot="state" slot-scope="text">
            <a-tag :color="text === 'open' ? 'green' : 'red'">{{text}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a role="button" href="javascript:;" @click="editBlog(text, record)">Edit</a>
          <a-divider type="vertical" />
          <a role="button" href="javascript:;" :disabled="record.state === 'closed'" @click="closeBlog(text, record)">Close</a>
          <a-divider type="vertical" />
        </span>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script>
import api from '../services/api';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'name'
    },
    {
        title: 'Labels',
        key: 'labels',
        dataIndex: 'labels',
        scopedSlots: { customRender: 'labels' }
    },
    {
        title: 'State',
        key: 'state',
        dataIndex: 'state',
        scopedSlots: { customRender: 'state' }
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at'
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
];

export default {
    name: 'ManageBlog',
    data() {
        return {
            data: [],
            columns,
            loading: false,
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            api.getBlogList('all').then(data => {
                this.loading = false;
                this.data = data;
            });
        },
        editBlog(blog) {
            this.$router.push({
                name: 'UpdateBlog',
                params: {
                    number: blog.number,
                    blogDetail: blog
                }
            })
        },
        closeBlog({number} = {}) {
            this.loading = true;
            api.closeBlog(number).finally(() => {
                this.loading = false;
            })
        }
    }
};
</script>

<style scoped></style>
