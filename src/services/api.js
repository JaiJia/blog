import axios from 'axios';

const apiPath = {
    blogList: 'https://api.github.com/repos/jaijia/blog/issues',
};

export default {
    getBlogList(state = open) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiPath.blogList}?state=${state}`, {
                headers: {
                    'Authorization': 'token ' + window.authArr.join(''),
                },
            }).then(rep => {
                resolve(rep.data);
            });
        });
    },
    getBlogDetail(number) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiPath.blogList}/${number}`).then(rep => {
                resolve(rep.data);
            });
        });
    },
    closeBlog(number) {
        return new Promise((resolve, reject) => {
            if (window.confirm('Make sure close?')) {
                axios.patch(`${apiPath.blogList}/${number}`, {
                    state: 'closed',
                }, {
                    headers: {
                        'Authorization': 'token ' + window.authArr.join(''),
                    },
                }).then(rep => {
                    console.log('Close Successfully!');
                }, err => {
                    console.error(`Error: ${err.response.data.message}`);
                });
            }
        });
    }
};