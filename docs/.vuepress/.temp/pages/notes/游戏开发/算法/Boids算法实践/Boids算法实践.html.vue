<template><div><p><img src="@source/notes/游戏开发/算法/Boids算法实践/res/title.gif" alt="title"></p>
<h1 id="boids算法实践" tabindex="-1"><a class="header-anchor" href="#boids算法实践"><span>Boids算法实践</span></a></h1>
<nav class="table-of-contents"><ul><li><router-link to="#算法原理">算法原理</router-link><ul><li><router-link to="#一、基本原理">一、基本原理</router-link></li><li><router-link to="#二、扩展">二、扩展</router-link></li></ul></li><li><router-link to="#代码实践">代码实践</router-link><ul><li><router-link to="#一、分离、平行、内聚-的加速度计算">一、分离、平行、内聚 的加速度计算</router-link></li><li><router-link to="#二、朝向指定目标">二、朝向指定目标</router-link></li><li><router-link to="#三、环境检测">三、环境检测</router-link></li></ul></li><li><router-link to="#测试优化">测试优化</router-link></li><li><router-link to="#参考">参考</router-link></li></ul></nav>
<h2 id="算法原理" tabindex="-1"><a class="header-anchor" href="#算法原理"><span>算法原理</span></a></h2>
<h3 id="一、基本原理" tabindex="-1"><a class="header-anchor" href="#一、基本原理"><span>一、基本原理</span></a></h3>
<p>Boids算法是一种群体模拟算法，常用于群体行为模拟。算法的核心包含三个基本行为：</p>
<ol>
<li><strong>分离(Separation)</strong>：检测周围个体，基于周围个体的位置，产生一个远离周围个体的力（速度或加速度）</li>
<li><strong>平行(Alignment)</strong>：检测周围个体，基于周围个体速度的平均值，产生一个平行力（速度或加速度）</li>
<li><strong>内聚(Cohesion)</strong>：检测周围个体，基于周围个体的质心，产生一个向质心的力（速度或加速度）</li>
</ol>
<p><img src="@source/notes/游戏开发/算法/Boids算法实践/res/pic_01.png" alt="Boids原理图"></p>
<p>Boids算法就是基于以上三点产生的力，通过加权求和，得到个体最终的运动结果</p>
<h3 id="二、扩展" tabindex="-1"><a class="header-anchor" href="#二、扩展"><span>二、扩展</span></a></h3>
<p>在实际开发过程中，我们可以添加其他影响因素，来改变集体行为。</p>
<h4 id="_1、指向target的力" tabindex="-1"><a class="header-anchor" href="#_1、指向target的力"><span><strong>1、指向target的力</strong></span></a></h4>
<p>给群体指定一个target，每个个体产生一个朝向target的力（速度或加速度），通过加权求和，可以让Boids群体朝向target移动</p>
<p><img src="@source/notes/游戏开发/算法/Boids算法实践/res/pic_02.png" alt="指向Taget的力"></p>
<h4 id="_2、避障检测" tabindex="-1"><a class="header-anchor" href="#_2、避障检测"><span><strong>2、避障检测</strong></span></a></h4>
<p>通过个体超周围方向进行射线检测，当检测到障碍物时，产生一个没有障碍物方向上的力，可以实现个体的环境避障</p>
<p><img src="@source/notes/游戏开发/算法/Boids算法实践/res/pic_03.png" alt="对周围进行射线检测"></p>
<h2 id="代码实践" tabindex="-1"><a class="header-anchor" href="#代码实践"><span>代码实践</span></a></h2>
<h3 id="一、分离、平行、内聚-的加速度计算" tabindex="-1"><a class="header-anchor" href="#一、分离、平行、内聚-的加速度计算"><span>一、分离、平行、内聚 的加速度计算</span></a></h3>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name">Vector3</span> <span class="token function">CalcuBoidAcceleration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">List<span class="token punctuation">&lt;</span>Boid<span class="token punctuation">></span></span> boids <span class="token operator">=</span> <span class="token keyword">group</span><span class="token punctuation">.</span>boids<span class="token punctuation">;</span>
    <span class="token class-name">Vector3</span> acc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>

    sepAcc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>  <span class="token comment">//分离加速度</span>
    aliAcc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>  <span class="token comment">//平行加速度</span>
    cohAcc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>  <span class="token comment">//内聚加速度</span>
    perceptNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Boid</span> boid <span class="token keyword">in</span> boids<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>boid <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    
        <span class="token class-name">Vector3</span> delta <span class="token operator">=</span> boid<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>position <span class="token operator">-</span> transform<span class="token punctuation">.</span>position<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">float</span></span> dis <span class="token operator">=</span> delta<span class="token punctuation">.</span>magnitude<span class="token punctuation">;</span>

        <span class="token comment">//只处理在检测范围内的对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dis <span class="token operator">&lt;</span> setting<span class="token punctuation">.</span>perceptionRadius<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            perceptNum<span class="token operator">++</span><span class="token punctuation">;</span>
            cohAcc <span class="token operator">+=</span> delta<span class="token punctuation">;</span>
            <span class="token comment">//Alignment加速度（基于其他对象的运动方向）</span>
            aliAcc <span class="token operator">+=</span> boid<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>forward<span class="token punctuation">;</span>
            <span class="token comment">//Separation加速度（基于其他对象的距离）</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>dis <span class="token operator">&lt;</span> setting<span class="token punctuation">.</span>avoidanceRadius<span class="token punctuation">)</span>
                sepAcc <span class="token operator">-=</span> delta<span class="token punctuation">.</span>normalized <span class="token operator">/</span> dis<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
        
    <span class="token keyword">if</span> <span class="token punctuation">(</span>perceptNum <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Cohesion加速度（基于其他对象的质心位置）</span>
        cohAcc <span class="token operator">=</span> cohAcc <span class="token operator">/</span> perceptNum<span class="token punctuation">;</span>
        acc <span class="token operator">=</span> <span class="token function">SteerTowards</span><span class="token punctuation">(</span>aliAcc<span class="token punctuation">)</span> <span class="token operator">*</span> setting<span class="token punctuation">.</span>alignmentWeight <span class="token operator">+</span> 
                <span class="token function">SteerTowards</span><span class="token punctuation">(</span>sepAcc<span class="token punctuation">)</span> <span class="token operator">*</span> setting<span class="token punctuation">.</span>separatonWeight <span class="token operator">+</span>
                <span class="token function">SteerTowards</span><span class="token punctuation">(</span>cohAcc<span class="token punctuation">)</span> <span class="token operator">*</span> setting<span class="token punctuation">.</span>cohesionWeight<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
        
    <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、朝向指定目标" tabindex="-1"><a class="header-anchor" href="#二、朝向指定目标"><span>二、朝向指定目标</span></a></h3>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name">Vector3</span> <span class="token function">CalcuTargetAcceleration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Vector3</span> acc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//朝向目标点加速度</span>
        <span class="token class-name">Vector3</span> tarAcc <span class="token operator">=</span> target<span class="token punctuation">.</span>position <span class="token operator">-</span> transform<span class="token punctuation">.</span>position<span class="token punctuation">;</span>
        acc <span class="token operator">=</span> <span class="token function">SteerTowards</span><span class="token punctuation">(</span>tarAcc<span class="token punctuation">)</span> <span class="token operator">*</span> setting<span class="token punctuation">.</span>targetWeight<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、环境检测" tabindex="-1"><a class="header-anchor" href="#三、环境检测"><span>三、环境检测</span></a></h3>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name">Vector3</span> <span class="token function">CalcuCollisionAcceleration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Vector3</span> acc <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>
    <span class="token class-name">RaycastHit</span> hitInfo<span class="token punctuation">;</span>

    <span class="token comment">//射线检测正前方，出现阻挡物时，进行后续检测</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> ishit <span class="token operator">=</span> Physics<span class="token punctuation">.</span><span class="token function">SphereCast</span><span class="token punctuation">(</span>transform<span class="token punctuation">.</span>position<span class="token punctuation">,</span>
        setting<span class="token punctuation">.</span>collisionRadius<span class="token punctuation">,</span>
        transform<span class="token punctuation">.</span>forward<span class="token punctuation">,</span>
        <span class="token keyword">out</span> hitInfo<span class="token punctuation">,</span>
        setting<span class="token punctuation">.</span>collisionDistance<span class="token punctuation">,</span>
        setting<span class="token punctuation">.</span>collisionMask<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ishit<span class="token punctuation">)</span>
        <span class="token keyword">return</span> acc<span class="token punctuation">;</span>

    <span class="token comment">//获取需要检测的射线方向（Local坐标）</span>
    <span class="token class-name">Vector3<span class="token punctuation">[</span><span class="token punctuation">]</span></span> detectDir <span class="token operator">=</span> <span class="token keyword">group</span><span class="token punctuation">.</span><span class="token function">GetDetectDirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> detectDir<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Vector3</span> dir <span class="token operator">=</span> detectDir<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">//将射线转化到世界坐标</span>
        dir <span class="token operator">=</span> transform<span class="token punctuation">.</span><span class="token function">TransformDirection</span><span class="token punctuation">(</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>            
        ishit <span class="token operator">=</span> Physics<span class="token punctuation">.</span><span class="token function">SphereCast</span><span class="token punctuation">(</span>transform<span class="token punctuation">.</span>position<span class="token punctuation">,</span>
            setting<span class="token punctuation">.</span>collisionRadius<span class="token punctuation">,</span>
            dir<span class="token punctuation">,</span>
            <span class="token keyword">out</span> hitInfo<span class="token punctuation">,</span>
            setting<span class="token punctuation">.</span>collisionDistance<span class="token punctuation">,</span>
            setting<span class="token punctuation">.</span>collisionMask<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ishit<span class="token punctuation">)</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token comment">//朝向没有碰撞的方向加速</span>
        acc <span class="token operator">=</span> dir<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    acc <span class="token operator">=</span> <span class="token function">SteerTowards</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span> <span class="token operator">*</span> setting<span class="token punctuation">.</span>collisionWeight<span class="token punctuation">;</span>
    <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>射线检测方向的获取可以参考均<a href="https://people.engr.tamu.edu/schaefer/research/normalCompression.pdf" target="_blank" rel="noopener noreferrer">匀球面离散点生成<ExternalLinkIcon/></a></p>
<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">Vector3<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">GetDetectDirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>detectDir <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> numDirs <span class="token operator">=</span> setting<span class="token punctuation">.</span>detectNum<span class="token punctuation">;</span>
        <span class="token comment">//均匀球面离散点生成</span>
        <span class="token comment">//参考文章:https://people.engr.tamu.edu/schaefer/research/normalCompression.pdf</span>
        detectDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Vector3</span><span class="token punctuation">[</span>numDirs<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">float</span></span> range <span class="token operator">=</span> Mathf<span class="token punctuation">.</span><span class="token function">Cos</span><span class="token punctuation">(</span>setting<span class="token punctuation">.</span>collisionAngle <span class="token operator">*</span> Mathf<span class="token punctuation">.</span>PI <span class="token operator">/</span> <span class="token number">360</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">float</span></span> goldenRatio <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> Mathf<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">float</span></span> angleIncrement <span class="token operator">=</span> Mathf<span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">*</span> goldenRatio<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> numDirs<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Vector3</span> p <span class="token operator">=</span> Vector3<span class="token punctuation">.</span>zero<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">float</span></span> t <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span>i <span class="token operator">/</span> numDirs<span class="token punctuation">;</span>

            <span class="token comment">//扇形区域</span>
            <span class="token class-name"><span class="token keyword">float</span></span> ac <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> range<span class="token punctuation">)</span> <span class="token operator">*</span> t<span class="token punctuation">;</span>
            <span class="token comment">//球形区域</span>
            <span class="token comment">//float ac = 1 - 2 * t;</span>

            <span class="token comment">//计算射线方向</span>
            <span class="token class-name"><span class="token keyword">float</span></span> alpha <span class="token operator">=</span> Mathf<span class="token punctuation">.</span><span class="token function">Acos</span><span class="token punctuation">(</span>ac<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">float</span></span> beta <span class="token operator">=</span> angleIncrement <span class="token operator">*</span> i<span class="token punctuation">;</span>
            p<span class="token punctuation">.</span>x <span class="token operator">=</span> Mathf<span class="token punctuation">.</span><span class="token function">Sin</span><span class="token punctuation">(</span>alpha<span class="token punctuation">)</span> <span class="token operator">*</span> Mathf<span class="token punctuation">.</span><span class="token function">Cos</span><span class="token punctuation">(</span>beta<span class="token punctuation">)</span><span class="token punctuation">;</span>
            p<span class="token punctuation">.</span>y <span class="token operator">=</span> Mathf<span class="token punctuation">.</span><span class="token function">Sin</span><span class="token punctuation">(</span>alpha<span class="token punctuation">)</span> <span class="token operator">*</span> Mathf<span class="token punctuation">.</span><span class="token function">Sin</span><span class="token punctuation">(</span>beta<span class="token punctuation">)</span><span class="token punctuation">;</span>
            p<span class="token punctuation">.</span>z <span class="token operator">=</span> Mathf<span class="token punctuation">.</span><span class="token function">Cos</span><span class="token punctuation">(</span>alpha<span class="token punctuation">)</span><span class="token punctuation">;</span>
            detectDir<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> p<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> detectDir<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中使用到了一个因子：goldenRatio = (1 + Mathf.Sqrt(5)) / 2;</p>
<p>这个因子可以使生成的射线更均匀的分布在球表面，以下是该因子从0开始逐渐增加时，射线产生的变化：</p>
<p><img src="@source/notes/游戏开发/算法/Boids算法实践/res/pic_04.gif" alt="射线变化"></p>
<h2 id="测试优化" tabindex="-1"><a class="header-anchor" href="#测试优化"><span>测试优化</span></a></h2>
<p>该项目的优化可以考虑使用以下方式优化：</p>
<ul>
<li>四叉树存储对象，可以一定程度上减少Update中遍历boids列表的数量</li>
<li>ComputeShader，将boids分离、平行、内聚的加速度运算改到ComputeShader运算，减少for遍历带来的损耗</li>
<li>Dots，使用dots系统可以很好的优化大量群体对象运算</li>
</ul>
<p>下图展示了使用ComputeShader优化后的性能表现
<img src="@source/notes/游戏开发/算法/Boids算法实践/res/pic_05.gif" alt="性能对比"></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://github.com/DarkNest/Boids" target="_blank" rel="noopener noreferrer">项目Github链接<ExternalLinkIcon/></a></p>
<p><a href="https://www.youtube.com/watch?v=bqtqltqcQhw" target="_blank" rel="noopener noreferrer">youtube视频<ExternalLinkIcon/></a></p>
<p>推荐书籍：《基于物理的建模与动画》</p>
</div></template>


