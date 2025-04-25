import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

import markdownItKatex from 'markdown-it-katex'

export default defineUserConfig({
    //基础配置
    base: '/',                  //根路径
    host: '0.0.0.0',            //服务器
    port: 8085,                 //端口

    //web 配置
    lang: 'zh-CN',
    title: 'MGW的站点',
    description: '( • ω • )✧',
    
    theme: defaultTheme({
        //logo 图标
        logo: '/miku.png',

        //logo 夜间模式图标
        //logoDark: '/logo.png',

        //导航栏
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '游戏开发',
                children: [
                    {
                        text: '图形',
                        link: '/notes/游戏开发/图形/',
                    },
                    {
                        text: '网络',
                        link: '/notes/游戏开发/网络/',
                    },
                    {
                        text: '算法',
                        link: '/notes/游戏开发/算法/',
                    },
                    {
                        text: '程序设计',
                        link: '/notes/游戏开发/程序设计/'
                    },
                ],
            },
            {
                text: '美术技巧',
                children: [
                    {
                        text: '像素艺术',
                        link: '/notes/美术技巧/像素艺术/',
                    },
                ],
            },
        ],

    }),
   
    plugins : [
        
    ],

    bundler: viteBundler(),
})
