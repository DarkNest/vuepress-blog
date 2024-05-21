<template><div><h1 id="定时系统" tabindex="-1"><a class="header-anchor" href="#定时系统"><span>定时系统</span></a></h1>
<h2 id="常见mono定时" tabindex="-1"><a class="header-anchor" href="#常见mono定时"><span>常见Mono定时</span></a></h2>
<h3 id="_1、coroutine-定时" tabindex="-1"><a class="header-anchor" href="#_1、coroutine-定时"><span>1、Coroutine 定时</span></a></h3>
<p>使用协程进行定时是Unity开发中的常用手段。</p>
<p><strong>优点：</strong></p>
<ul>
<li>易于实现与理解</li>
<li>避免阻塞主线程</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>协程需要依赖被挂载的对象的MonoBehaviour，对于服务端无法使用</li>
<li>当对象的active被设置成false时，协程会失效，即使恢复对象状态协程也不会继续运行</li>
<li>对象被销毁时，其协程资源也会被销毁</li>
<li>协程是基于帧等待机制,受帧率与Time,timesclae影响</li>
</ul>
<p>虽然可以使用一个单独的Mono单例去管理所有协程，从而避免协程挂掉，但精度问题是无法解决的。</p>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Timer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> delay <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">StartCoroutine</span><span class="token punctuation">(</span><span class="token function">DelayTime</span><span class="token punctuation">(</span>delay<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token return-type class-name">IEnumerator</span> <span class="token function">DelayTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">float</span></span> time<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"等待延时</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">time</span><span class="token punctuation">}</span></span><span class="token string">s"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">yield</span> <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WaitForSeconds</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"延时结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、update-定时" tabindex="-1"><a class="header-anchor" href="#_2、update-定时"><span>2、Update 定时</span></a></h3>
<p><strong>优点：</strong></p>
<ul>
<li>易于实现</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>需要很多中间变量维护定时器，使得代码结构更混乱，更难理解与维护</li>
<li>依赖被挂载的对象的MonoBehaviour，对于服务端无法使用</li>
<li>协程是基于帧等待机制,受帧率与Time,timesclae影响</li>
</ul>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Timer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> delay <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">float</span></span> timer <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> isEnd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        timer <span class="token operator">+=</span> Time<span class="token punctuation">.</span>deltaTime<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>timer <span class="token operator">>=</span> delay <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isEnd<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"延时结束"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            isEnd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定时器设计" tabindex="-1"><a class="header-anchor" href="#定时器设计"><span>定时器设计</span></a></h2>
<h3 id="_1、定时器驱动" tabindex="-1"><a class="header-anchor" href="#_1、定时器驱动"><span>1、定时器驱动</span></a></h3>
<p>定时器的设计按照驱动方式，有三种设计方式：</p>
<ul>
<li>
<p>外部驱动：提供外部更新接口，在定时器外部检测定时任务。
这种方式可以外接自定义的驱动程序（例如MonoBehavior中用Update），定时精度取决于驱动程序。</p>
</li>
<li>
<p>单线程Tick驱动：创建一个新的线程，在线程中以固定频率检测定时任务。
该方式所有定时任务都在一个独立线程中中执行，如果存在很耗时的任务，可能会阻塞该线程，影响到其他定时任务。</p>
</li>
<li>
<p>多线程驱动：为每个任务创建一个线程，每个线程单独执行该定时任务。
每个任务都有独立的线程，任务之间互不干扰，但如果定时任务过多，会占用大量线程资源。</p>
</li>
</ul>
<h3 id="_2、延时补偿" tabindex="-1"><a class="header-anchor" href="#_2、延时补偿"><span>2、延时补偿</span></a></h3>
<p>一般在定时器执行延时操作时，都会存在一定的误差，当定时器长期运行后，这种误差会逐渐增大。
这种时候，我们可以通过添加延时补偿来修正定时效果，从而减小累计延时误差。</p>
<p>延时补偿的原理如下图所示
<img src="@source/notes/游戏开发/程序设计/定时系统/res/pic_01.png" alt="延时补偿原理"></p>
<p>定时器在一轮定时任务中，实际延时RunTime，与期望的Delay存在误差（fix），我们可以计算该误差，
并在下一轮延时中，添加上该误差值，从而使得每轮定时任务可以尽可能在期望时间点执行。</p>
<p>以下代码为延时补偿的代码（多线程异步）</p>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token class-name">CancellationTokenSource</span> cancelTokenSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CancellationTokenSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">CancellationToken</span> cancelToken <span class="token operator">=</span> cancelTokenSource<span class="token punctuation">.</span>Token<span class="token punctuation">;</span>
<span class="token class-name">Task</span> timerTask <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Task</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>                
    <span class="token class-name"><span class="token keyword">long</span></span> loopCnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> nextStepTime <span class="token operator">=</span> stepTime<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> startTime <span class="token operator">=</span> TimerTool<span class="token punctuation">.</span><span class="token function">GetCurMillisecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//延时</span>
        <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span>nextStepTime<span class="token punctuation">,</span> cancelToken<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ContinueWith</span><span class="token punctuation">(</span>tsk <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//退出线程</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cancelTokenSource<span class="token punctuation">.</span>IsCancellationRequested<span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token comment">//延时补偿</span>
        loopCnt<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> curTime <span class="token operator">=</span> TimerTool<span class="token punctuation">.</span><span class="token function">GetCurMillisecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> totalRunTime <span class="token operator">=</span> curTime <span class="token operator">-</span> startTime<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> totalStepTime <span class="token operator">=</span> loopCnt <span class="token operator">*</span> stepTime<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> fixTime <span class="token operator">=</span> totalStepTime <span class="token operator">-</span> totalRunTime<span class="token punctuation">;</span>
        nextStepTime <span class="token operator">=</span> stepTime <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>fixTime<span class="token punctuation">;</span>
        nextStepTime <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span>nextStepTime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//更新定时任务</span>
        <span class="token function">UpdateTimerTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
timerTask<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下图为使用固定延时（延时50ms），定时器循环累计定时的误差，可以看到该误差值随着时间越来越大
<img src="@source/notes/游戏开发/程序设计/定时系统/res/pic_02.png" alt="定时器循环累计误差"></p>
<p>下图为添加了延时补偿的定时器（延时50ms），可以看到每次调用的误差值基本在可控范围
<img src="@source/notes/游戏开发/程序设计/定时系统/res/pic_03.png" alt="延时补偿定时器"></p>
<h3 id="_3、其他" tabindex="-1"><a class="header-anchor" href="#_3、其他"><span>3、其他</span></a></h3>
<p><a href="https://github.com/DarkNest/GWTimer/tree/main" target="_blank" rel="noopener noreferrer">定时器项目Github<ExternalLinkIcon/></a></p>
</div></template>


