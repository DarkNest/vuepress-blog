<template><div><h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h1>
<p>单例模式代码设计如下所示</p>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">SingletonMono<span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">SingletonMono<span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">T</span> instance<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">T</span> Instance
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                instance <span class="token operator">=</span> <span class="token generic-method"><span class="token function">FindObjectOfType</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">GameObject</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GameObject</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    instance <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Awake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> instance <span class="token operator">!=</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Debug<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"重复单例："</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Destroy</span><span class="token punctuation">(</span>gameObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token keyword">as</span> <span class="token class-name">T</span><span class="token punctuation">;</span>
            <span class="token function">DontDestroyOnLoad</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>gameObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


