<template><div><h1 id="blur效果实现与应用" tabindex="-1"><a class="header-anchor" href="#blur效果实现与应用"><span>Blur效果实现与应用</span></a></h1>
<h2 id="一、模糊算法" tabindex="-1"><a class="header-anchor" href="#一、模糊算法"><span>一、模糊算法</span></a></h2>
<p>模糊效果在游戏开发过程中经常会应用到。</p>
<p>常用模糊算法：</p>
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
<p><strong>链接：</strong></p>
<p><a href="https://zhuanlan.zhihu.com/p/125744132" target="_blank" rel="noopener noreferrer">十种模糊算法的总结与实现<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/QianMo/X-PostProcessing-Library" target="_blank" rel="noopener noreferrer">X-PostProcessing Libray<ExternalLinkIcon/></a></p>
<h3 id="_1、模糊算法的基本思想" tabindex="-1"><a class="header-anchor" href="#_1、模糊算法的基本思想"><span>1、模糊算法的基本思想</span></a></h3>
<p>模糊算法基本思想一般为以下几点：</p>
<ol>
<li><strong>卷积滤波：</strong> 通过卷积滤掉高频信息，可以采样不同卷积核达到不同滤波效果（高斯、方框、Kawase、双重）</li>
<li><strong>降、升采样：</strong> 在过程中产生像素信息丢失，优化模糊效果（双重）</li>
<li><strong>采样偏移：</strong> 对进行模糊的采样点偏移，从而实现指定方向的模糊（粒状、径向、方向）</li>
<li><strong>历史帧采样：</strong> 保留之前帧，对历史帧与当前帧混合，达到动态模糊效果（动态）</li>
<li><strong>遮罩：</strong> 在模糊的基础上，添加不同遮罩，产生不同模糊效果（移轴、光圈）</li>
</ol>
<p>实际应用一般是基于以上思路进行组合或优化，从而达到目标效果</p>
<h3 id="_2、基础模糊算法" tabindex="-1"><a class="header-anchor" href="#_2、基础模糊算法"><span>2、基础模糊算法</span></a></h3>
<h4 id="高斯模糊" tabindex="-1"><a class="header-anchor" href="#高斯模糊"><span>高斯模糊</span></a></h4>
<p><strong>核心思想：</strong> 卷积是数字图像处理中，一种常用的提取图像信息的操作，在数字信号系统中，是一种滤波操作，高斯模糊就是用高斯卷积核，来提取信息，过滤高频信息的方式</p>
<p><strong>注意事项：</strong> 高斯卷积核虽然是方形卷积核，但先做横向一排的卷积，再做纵向一排的卷积，在数学上是等价的，但是对于计算机，做一次横向+纵向卷积要比直接方向卷积要快的多，这也是为什么我们经常看到的卷积代码是分横向卷积与纵向卷积的。</p>
<h4 id="方框模糊" tabindex="-1"><a class="header-anchor" href="#方框模糊"><span>方框模糊</span></a></h4>
<p>方框模糊的本质与高斯模糊无异，只是使用的卷积核不同，产生的模糊效果也有所差异</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic01.jpg" alt="方框模糊与高斯模糊对比图"></p>
<p>下图是两种卷积核的对比图</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic02.jpg" alt="方框模糊与高斯模糊卷积核对比图"></p>
<h4 id="kawase-模糊" tabindex="-1"><a class="header-anchor" href="#kawase-模糊"><span>Kawase 模糊</span></a></h4>
<p>Kawase 模糊的基本原理也是利用卷积进行模糊，与高斯和方框模糊的固定卷积核不同，该算法的卷积核随着迭代次数增肌，采样点也逐渐变远</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic03.jpg" alt="Kawase 模糊"></p>
<h4 id="双重模糊" tabindex="-1"><a class="header-anchor" href="#双重模糊"><span>双重模糊</span></a></h4>
<p>双重模糊则是在Kawas模糊的基础上进行改进，添加了使用不同分辨率图进行上采样与下采样的过程，并调整了卷积使用的卷积核。</p>
<p>双重采样的卷积核：：</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic04.jpg" alt="双重采样的卷积核"></p>
<p>双重采样的采样过程：</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic05.jpg" alt="双重采样采样过程"></p>
<h2 id="二、在urp管线下添加blur后处理" tabindex="-1"><a class="header-anchor" href="#二、在urp管线下添加blur后处理"><span>二、在URP管线下添加Blur后处理</span></a></h2>
<p>在URP管线中添加后处理一般有两种方法：</p>
<ol>
<li>RenderFeature + RenderPass</li>
<li>RenderPipelineManager + RenderPass</li>
</ol>
<p>本文中的示例都将采用高斯模糊，根据实际项目情况，也可以采用方框模糊或双重模糊等算法。</p>
<h3 id="_1、renderpass-部分" tabindex="-1"><a class="header-anchor" href="#_1、renderpass-部分"><span>1、RenderPass 部分</span></a></h3>
<p>在URP管线中，<strong>RenderPass</strong> 的主要作用是负责Shader的具体执行，编写 <strong>BlurPass</strong> 脚本，需要继承并实现 <strong>ScriptableRenderPass</strong>。</p>
<p>在代码中，我们将 <strong>renderPassEvent</strong> 设置为了 <strong>RenderPassEvent.AfterRenderingTransparents</strong>，那么在渲染过程中，这个BlurPass的渲染相关操作将在Transparents被渲染之后执行。</p>
<p>由于卷积操作需要申请 <strong>RenderTexture</strong>，为了减少RT占用内存，我们使用 <strong>void SwitchBuffer(ref int src, ref int tar)</strong> 来在两张RT上来回卷积，从而减少内存占用</p>
<p>此外，由于是模糊效果，即使降低RT的尺寸，对最终效果的影响也不会太大，却可以大幅降低RT所占用的内存，这也是一种常用的优化策略。</p>
<p>在FrameDebug中，我们可以看到BlurPass具体的DC执行情况、渲染目标、材质参数、缓存buffer等情况</p>
<p><img src="@source/notes/游戏开发/图形/Blur效果实现与应用/res/pic06.jpg" alt="FrameDebug"></p>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine<span class="token punctuation">.</span>Rendering</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine<span class="token punctuation">.</span>Rendering<span class="token punctuation">.</span>Universal</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlurPass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ScriptableRenderPass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Material</span> material<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> bufferName <span class="token operator">=</span> <span class="token string">"_PostBuffer"</span><span class="token punctuation">;</span>

	<span class="token class-name">BlurConfig</span> cameraConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BlurConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlurConfig</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> iter<span class="token punctuation">;</span>
		<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> factor<span class="token punctuation">;</span>
		<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> rtScale<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token preprocessor property">#<span class="token directive keyword">region</span> 渲染相关</span>
	<span class="token keyword">public</span> <span class="token function">BlurPass</span><span class="token punctuation">(</span><span class="token class-name">Material</span> mat<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        material <span class="token operator">=</span> mat<span class="token punctuation">;</span>
		renderPassEvent <span class="token operator">=</span> RenderPassEvent<span class="token punctuation">.</span>AfterRenderingTransparents<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token class-name">ScriptableRenderContext</span> context<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">RenderingData</span> renderingData<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token class-name">BlurConfig</span> config <span class="token operator">=</span> cameraConfig<span class="token punctuation">;</span>
		<span class="token class-name">RenderTargetIdentifier</span> camTarget <span class="token operator">=</span> renderingData<span class="token punctuation">.</span>cameraData<span class="token punctuation">.</span>renderer<span class="token punctuation">.</span>cameraColorTarget<span class="token punctuation">;</span>
		<span class="token function">ProcessPosEffect</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> camTarget<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessPosEffect</span><span class="token punctuation">(</span><span class="token class-name">ScriptableRenderContext</span> context<span class="token punctuation">,</span> <span class="token class-name">RenderTargetIdentifier</span> camTarget<span class="token punctuation">,</span> <span class="token class-name">BlurConfig</span> config<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>iter <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>

		<span class="token class-name">CommandBuffer</span> cmd <span class="token operator">=</span> CommandBufferPool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"BlurPass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name"><span class="token keyword">int</span></span> temp0 <span class="token operator">=</span> Shader<span class="token punctuation">.</span><span class="token function">PropertyToID</span><span class="token punctuation">(</span>bufferName <span class="token operator">+</span> <span class="token string">"_0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name"><span class="token keyword">int</span></span> temp1 <span class="token operator">=</span> Shader<span class="token punctuation">.</span><span class="token function">PropertyToID</span><span class="token punctuation">(</span>bufferName <span class="token operator">+</span> <span class="token string">"_1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name"><span class="token keyword">int</span></span> rtW <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Screen<span class="token punctuation">.</span>width <span class="token operator">*</span> config<span class="token punctuation">.</span>rtScale<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name"><span class="token keyword">int</span></span> rtH <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Screen<span class="token punctuation">.</span>height <span class="token operator">*</span> config<span class="token punctuation">.</span>rtScale<span class="token punctuation">)</span><span class="token punctuation">;</span>
		cmd<span class="token punctuation">.</span><span class="token function">GetTemporaryRT</span><span class="token punctuation">(</span>temp0<span class="token punctuation">,</span> rtW<span class="token punctuation">,</span> rtH<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		
		<span class="token keyword">if</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>iter <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span>
			cmd<span class="token punctuation">.</span><span class="token function">GetTemporaryRT</span><span class="token punctuation">(</span>temp1<span class="token punctuation">,</span> rtW<span class="token punctuation">,</span> rtH<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">//设置材质属性</span>
		<span class="token class-name"><span class="token keyword">float</span></span> hori <span class="token operator">=</span> config<span class="token punctuation">.</span>factor <span class="token operator">/</span> Screen<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
		<span class="token class-name"><span class="token keyword">float</span></span> vert <span class="token operator">=</span> config<span class="token punctuation">.</span>factor <span class="token operator">/</span> Screen<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
		material<span class="token punctuation">.</span><span class="token function">SetFloat</span><span class="token punctuation">(</span><span class="token string">"blurFactorX"</span><span class="token punctuation">,</span> hori<span class="token punctuation">)</span><span class="token punctuation">;</span>
		material<span class="token punctuation">.</span><span class="token function">SetFloat</span><span class="token punctuation">(</span><span class="token string">"blurFactorY"</span><span class="token punctuation">,</span> vert<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">//模糊处理</span>
		<span class="token class-name"><span class="token keyword">int</span></span> src <span class="token operator">=</span> temp0<span class="token punctuation">;</span>
		<span class="token class-name"><span class="token keyword">int</span></span> tar <span class="token operator">=</span> temp1<span class="token punctuation">;</span>

		cmd<span class="token punctuation">.</span><span class="token function">Blit</span><span class="token punctuation">(</span>camTarget<span class="token punctuation">,</span> temp0<span class="token punctuation">,</span> material<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> config<span class="token punctuation">.</span>iter<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//纵向</span>
			cmd<span class="token punctuation">.</span><span class="token function">Blit</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> tar<span class="token punctuation">,</span> material<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">SwitchBuffer</span><span class="token punctuation">(</span><span class="token keyword">ref</span> src<span class="token punctuation">,</span> <span class="token keyword">ref</span> tar<span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">//横向</span>
			cmd<span class="token punctuation">.</span><span class="token function">Blit</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> tar<span class="token punctuation">,</span> material<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">SwitchBuffer</span><span class="token punctuation">(</span><span class="token keyword">ref</span> src<span class="token punctuation">,</span> <span class="token keyword">ref</span> tar<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//渲染到相机输出纹理</span>
		cmd<span class="token punctuation">.</span><span class="token function">Blit</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> camTarget<span class="token punctuation">,</span> material<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">//执行后处理		</span>
		context<span class="token punctuation">.</span><span class="token function">ExecuteCommandBuffer</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">//释放缓存</span>
		cmd<span class="token punctuation">.</span><span class="token function">ReleaseTemporaryRT</span><span class="token punctuation">(</span>temp0<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>iter <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span>
			cmd<span class="token punctuation">.</span><span class="token function">ReleaseTemporaryRT</span><span class="token punctuation">(</span>temp1<span class="token punctuation">)</span><span class="token punctuation">;</span>

		CommandBufferPool<span class="token punctuation">.</span><span class="token function">Release</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

	<span class="token preprocessor property">#<span class="token directive keyword">region</span> 对外接口</span>

	<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetCameraBlurParams</span><span class="token punctuation">(</span><span class="token class-name">BlurConfig</span> config<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		cameraConfig <span class="token operator">=</span> config<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SwitchBuffer</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> src<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> tar<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> temp <span class="token operator">=</span> src<span class="token punctuation">;</span>
        src <span class="token operator">=</span> tar<span class="token punctuation">;</span>
        tar <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、shader-部分" tabindex="-1"><a class="header-anchor" href="#_2、shader-部分"><span>2、Shader 部分</span></a></h3>
<div class="language-hlsl line-numbers-mode" data-ext="hlsl" data-title="hlsl"><pre v-pre class="language-hlsl"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div><h2 id="四、利用blur实现ui背景模糊" tabindex="-1"><a class="header-anchor" href="#四、利用blur实现ui背景模糊"><span>四、利用Blur实现UI背景模糊</span></a></h2>
<h2 id="五、直接模糊texture" tabindex="-1"><a class="header-anchor" href="#五、直接模糊texture"><span>五、直接模糊Texture</span></a></h2>
<h2 id="六、ui裁剪模糊" tabindex="-1"><a class="header-anchor" href="#六、ui裁剪模糊"><span>六、UI裁剪模糊</span></a></h2>
<h2 id="七、毛玻璃模糊效果" tabindex="-1"><a class="header-anchor" href="#七、毛玻璃模糊效果"><span>七、毛玻璃模糊效果</span></a></h2>
</div></template>


