<template>
    <div id="app">
        <a-layout>
            <a-layout-header class="home-header">
                <div class="logo">
                    <img src="./assets/logo.png" alt="Logo" width="30">
                </div>
                <a-menu theme="dark" mode="horizontal" style="line-height: 64px;">
                    <a-menu-item key="1">
                        <router-link to="/">Home</router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <router-link to="/post">Post</router-link>
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
        </a-layout>

        <router-view></router-view>

        <a-layout>
            <a-layout-footer class="home-footer">
                Ant Design ©2019
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
