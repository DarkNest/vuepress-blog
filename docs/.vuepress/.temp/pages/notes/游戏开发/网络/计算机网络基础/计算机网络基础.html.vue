<template><div><h1 id="计算机网络基础" tabindex="-1"><a class="header-anchor" href="#计算机网络基础"><span>计算机网络基础</span></a></h1>
<h2 id="一、五层协议模型" tabindex="-1"><a class="header-anchor" href="#一、五层协议模型"><span>一、五层协议模型</span></a></h2>
<p><img src="@source/notes/游戏开发/网络/计算机网络基础/res/pic_01.png" alt="协议模型"></p>
<ul>
<li>
<p><strong>应用层：</strong> 直接为应用进程提供服务：HTTP（浏览器）、SMTP（邮件）、FTP（文件传输）</p>
</li>
<li>
<p><strong>运输层：</strong> 运输应用层的数据，主要为两种协议：</p>
<pre><code>TCP：传输控制协议（Transmission Control Protocol）
面向连接，以报文段（segment）为传输单位，保证传输可靠性

UDP：用户数据报协议（User Datapram Protocal）
无连接，以用户数据包为传输单位，不保证传输可靠性
</code></pre>
</li>
<li>
<p><strong>网络层：</strong></p>
<pre><code>负责在不同主机之间传输数据包。

定义了逻辑地址（例如IP地址）以标识所有节点，并规定了路由的实现方式。

网络层还处理数据包的分段，以适应不同传输介质的最大传输单元长度。

协议：IP（Internet Protocol）、IPX等。

数据单位：数据包（packet）。
</code></pre>
</li>
<li>
<p><strong>数据链路层：</strong></p>
<pre><code>负责在单个链路上传输数据。

它定义了如何在物理链路上传输数据，与具体的传输介质有关。

数据链路层将数据封装成帧，并处理帧的传输、错误检测和纠正。

协议：Ethernet、FDDI等。

数据单位：帧（frame）。
</code></pre>
</li>
<li>
<p><strong>物理层：</strong> 实际的物理连接，比特流数据传输</p>
</li>
</ul>
<h2 id="二、常用基于udp的网络库" tabindex="-1"><a class="header-anchor" href="#二、常用基于udp的网络库"><span>二、常用基于UDP的网络库</span></a></h2>
<ul>
<li>
<p><strong>ENet：</strong></p>
<pre><code>简单而强大的可靠UDP网络库。

专门用于实时多人游戏，基于UDP。

提供了面向连接的协议、可靠性、流式传输和部分可靠的数据报传输12.
</code></pre>
</li>
<li>
<p><strong>RakNet：</strong></p>
<pre><code>基于UDP网络传输协议的C++网络库。

用于游戏中实现高效的网络传输服务。

特点包括高性能、易用性、跨平台支持、安全传输、音频传输等13.
</code></pre>
</li>
<li>
<p><strong>KCP：</strong></p>
<pre><code>快速可靠协议，能以比TCP浪费10%-20%的带宽的代价，换取平均延迟降低30%-40%，且最大延迟降低三倍的传输效果。

纯算法实现，需要自定义底层数据包的发送方式。

适用于P2P、基于UDP的协议等场景14.
</code></pre>
</li>
</ul>
</div></template>


