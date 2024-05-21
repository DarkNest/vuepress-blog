<template><div><h1 id="blur效果实现与应用" tabindex="-1"><a class="header-anchor" href="#blur效果实现与应用"><span>Blur效果实现与应用</span></a></h1>
<h3 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介"><span>一、简介</span></a></h3>
<p>模糊效果在游戏开发过程中经常会应用到，常用的模糊算法：</p>
<table>
<thead>
<tr>
<th>模糊算法</th>
<th></th>
<th>模糊品质</th>
<th>性能</th>
</tr>
</thead>
<tbody>
<tr>
<td>Gaussian Blur</td>
<td>高斯模糊</td>
<td>高</td>
<td>一般</td>
</tr>
<tr>
<td>Box Blur</td>
<td>方框模糊</td>
<td>高</td>
<td>一般</td>
</tr>
<tr>
<td>Kawase Blur</td>
<td>Kawase 模糊</td>
<td>高</td>
<td>较好</td>
</tr>
<tr>
<td>Dual Blur</td>
<td>双重模糊</td>
<td>高</td>
<td>好</td>
</tr>
<tr>
<td>Bokeh Blur</td>
<td>散景模糊</td>
<td>高</td>
<td>差</td>
</tr>
<tr>
<td>Tilt Shift Blur</td>
<td>移轴模糊</td>
<td>高</td>
<td>差</td>
</tr>
<tr>
<td>Iris Blur</td>
<td>光圈模糊</td>
<td>高</td>
<td>差</td>
</tr>
<tr>
<td>Grainy Blur</td>
<td>粒状模糊</td>
<td>一般</td>
<td>好</td>
</tr>
<tr>
<td>Radial Blur</td>
<td>径向模糊</td>
<td>高</td>
<td>一般</td>
</tr>
<tr>
<td>Directional Blur</td>
<td>方向模糊</td>
<td>高</td>
<td>一般</td>
</tr>
</tbody>
</table>
<p><a href="https://zhuanlan.zhihu.com/p/125744132" target="_blank" rel="noopener noreferrer">十种模糊算法的总结与实现<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/QianMo/X-PostProcessing-Library" target="_blank" rel="noopener noreferrer">X-PostProcessing Libray<ExternalLinkIcon/></a></p>
<p>本文是基于高斯模糊，在 Unity URP 管线下的应用</p>
<h3 id="二、高斯模糊原理" tabindex="-1"><a class="header-anchor" href="#二、高斯模糊原理"><span>二、高斯模糊原理</span></a></h3>
<h3 id="三、在urp管线下添加blur后处理" tabindex="-1"><a class="header-anchor" href="#三、在urp管线下添加blur后处理"><span>三、在URP管线下添加Blur后处理</span></a></h3>
<h3 id="四、利用blur实现ui背景模糊" tabindex="-1"><a class="header-anchor" href="#四、利用blur实现ui背景模糊"><span>四、利用Blur实现UI背景模糊</span></a></h3>
<h3 id="五、直接模糊texture" tabindex="-1"><a class="header-anchor" href="#五、直接模糊texture"><span>五、直接模糊Texture</span></a></h3>
<h3 id="六、ui裁剪模糊" tabindex="-1"><a class="header-anchor" href="#六、ui裁剪模糊"><span>六、UI裁剪模糊</span></a></h3>
<h3 id="七、毛玻璃模糊效果" tabindex="-1"><a class="header-anchor" href="#七、毛玻璃模糊效果"><span>七、毛玻璃模糊效果</span></a></h3>
</div></template>


