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
                text: '项目实战',
                children: [
                    {
                        text: '基于帧同步的MOBA',
                        link: '/notes/项目实战/基于帧同步的MOBA/',
                    },
                    {
                        text: '基于状态同步的MMO',
                        link: '/notes/项目实战/基于状态同步的MMO/',
                    },
                ],
            },
            {
                text: '番剧赏评',
                link: '/notes/番剧赏评/',
            },
            {
                text: '游戏赏评',
                link: '/notes/游戏赏评/',
            },
        ],

    }),
   
    plugins : [
        
    ],

    bundler: viteBundler(),
})
