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
            <div :style="{ background: '#fff', padding: '24px', minHeight: '70vh' }">This is my blog site.</div>
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
    export default {
        name: "HomePage"
    }
</script>

<style scoped>

</style>