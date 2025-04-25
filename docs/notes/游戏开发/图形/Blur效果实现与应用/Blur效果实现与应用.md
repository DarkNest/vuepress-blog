Blur效果实现与应用
===

## 一、模糊算法

模糊效果在游戏开发过程中经常会应用到。

常用模糊算法：

| 模糊算法 |  | 模糊品质 | 性能 |
| - | - | - | - |
| Gaussian Blur | 高斯模糊 | 高 | 一般 |
| Box Blur | 方框模糊 | 高 | 一般 |
| Kawase Blur | Kawase 模糊 | 高 | 较好 |
| Dual Blur | 双重模糊 | 高 | 好 | 好 | 
| Bokeh Blur | 散景模糊 | 高 | 差 |
| Tilt Shift Blur | 移轴模糊 | 高 | 差 |
| Iris Blur | 光圈模糊 | 高 | 差 |
| Grainy Blur | 粒状模糊 | 一般 | 好 |
| Radial Blur | 径向模糊 | 高 | 一般 |
| Directional Blur | 方向模糊 | 高 | 一般 |

**链接：**

[十种模糊算法的总结与实现](https://zhuanlan.zhihu.com/p/125744132)

[X-PostProcessing Libray](https://github.com/QianMo/X-PostProcessing-Library)


### 1、模糊算法的基本思想

模糊算法基本思想一般为以下几点：

1. **卷积滤波：** 通过卷积滤掉高频信息，可以采样不同卷积核达到不同滤波效果（高斯、方框、Kawase、双重）
2. **降、升采样：** 在过程中产生像素信息丢失，优化模糊效果（双重）
3. **采样偏移：** 对进行模糊的采样点偏移，从而实现指定方向的模糊（粒状、径向、方向）
4. **历史帧采样：** 保留之前帧，对历史帧与当前帧混合，达到动态模糊效果（动态）
5. **遮罩：** 在模糊的基础上，添加不同遮罩，产生不同模糊效果（移轴、光圈）

实际应用一般是基于以上思路进行组合或优化，从而达到目标效果

### 2、基础模糊算法
#### 高斯模糊
**核心思想：** 卷积是数字图像处理中，一种常用的提取图像信息的操作，在数字信号系统中，是一种滤波操作，高斯模糊就是用高斯卷积核，来提取信息，过滤高频信息的方式

**注意事项：** 高斯卷积核虽然是方形卷积核，但先做横向一排的卷积，再做纵向一排的卷积，在数学上是等价的，但是对于计算机，做一次横向+纵向卷积要比直接方向卷积要快的多，这也是为什么我们经常看到的卷积代码是分横向卷积与纵向卷积的。

#### 方框模糊
方框模糊的本质与高斯模糊无异，只是使用的卷积核不同，产生的模糊效果也有所差异

![方框模糊与高斯模糊对比图](./res/pic01.jpg)

下图是两种卷积核的对比图

![方框模糊与高斯模糊卷积核对比图](./res/pic02.jpg)

#### Kawase 模糊
Kawase 模糊的基本原理也是利用卷积进行模糊，与高斯和方框模糊的固定卷积核不同，该算法的卷积核随着迭代次数增肌，采样点也逐渐变远

![Kawase 模糊](./res/pic03.jpg)

#### 双重模糊
双重模糊则是在Kawas模糊的基础上进行改进，添加了使用不同分辨率图进行上采样与下采样的过程，并调整了卷积使用的卷积核。

双重采样的卷积核：：

![双重采样的卷积核](./res/pic04.jpg)

双重采样的采样过程：

![双重采样采样过程](./res/pic05.jpg)

## 二、在URP管线下添加Blur后处理
在URP管线中添加后处理一般有两种方法：

1. RenderFeature + RenderPass
2. RenderPipelineManager + RenderPass

本文中的示例都将采用高斯模糊，根据实际项目情况，也可以采用方框模糊或双重模糊等算法。

### 1、RenderPass 部分
在URP管线中，**RenderPass** 的主要作用是负责Shader的具体执行，编写 **BlurPass** 脚本，需要继承并实现 **ScriptableRenderPass**。

在代码中，我们将 **renderPassEvent** 设置为了 **RenderPassEvent.AfterRenderingTransparents**，那么在渲染过程中，这个BlurPass的渲染相关操作将在Transparents被渲染之后执行。

由于卷积操作需要申请 **RenderTexture**，为了减少RT占用内存，我们使用 **void SwitchBuffer(ref int src, ref int tar)** 来在两张RT上来回卷积，从而减少内存占用

此外，由于是模糊效果，即使降低RT的尺寸，对最终效果的影响也不会太大，却可以大幅降低RT所占用的内存，这也是一种常用的优化策略。

在FrameDebug中，我们可以看到BlurPass具体的DC执行情况、渲染目标、材质参数、缓存buffer等情况

![FrameDebug](./res/pic06.jpg)

``` csharp
using System;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

public class BlurPass : ScriptableRenderPass
{
    private Material material;
    private const string bufferName = "_PostBuffer";

	BlurConfig cameraConfig = new BlurConfig();

	[Serializable]
	public class BlurConfig
	{
		public int iter;
		public float factor;
		public float rtScale;
	}

	#region 渲染相关
	public BlurPass(Material mat)
    {
        material = mat;
		renderPassEvent = RenderPassEvent.AfterRenderingTransparents;
    }

	public override void Execute(ScriptableRenderContext context, ref RenderingData renderingData)
	{
		BlurConfig config = cameraConfig;
		RenderTargetIdentifier camTarget = renderingData.cameraData.renderer.cameraColorTarget;
		ProcessPosEffect(context, camTarget, config);
	}

	private void ProcessPosEffect(ScriptableRenderContext context, RenderTargetIdentifier camTarget, BlurConfig config)
	{
		if (config.iter == 0)
			return;

		CommandBuffer cmd = CommandBufferPool.Get("BlurPass");

		int temp0 = Shader.PropertyToID(bufferName + "_0");
		int temp1 = Shader.PropertyToID(bufferName + "_1");

		int rtW = (int)(Screen.width * config.rtScale);
		int rtH = (int)(Screen.height * config.rtScale);
		cmd.GetTemporaryRT(temp0, rtW, rtH, 0);		
		if(config.iter > 1)
			cmd.GetTemporaryRT(temp1, rtW, rtH, 0);

		//设置材质属性
		float hori = config.factor / Screen.width;
		float vert = config.factor / Screen.height;
		material.SetFloat("blurFactorX", hori);
		material.SetFloat("blurFactorY", vert);

		//模糊处理
		int src = temp0;
		int tar = temp1;

		cmd.Blit(camTarget, temp0, material, 0);
		for (int i = 1; i < config.iter; i++)
		{
			//纵向
			cmd.Blit(src, tar, material, 1);
			SwitchBuffer(ref src, ref tar);

			//横向
			cmd.Blit(src, tar, material, 0);
			SwitchBuffer(ref src, ref tar);
		}
		//渲染到相机输出纹理
		cmd.Blit(src, camTarget, material, 1);

		//执行后处理		
		context.ExecuteCommandBuffer(cmd);

		//释放缓存
		cmd.ReleaseTemporaryRT(temp0);
		if(config.iter > 1)
			cmd.ReleaseTemporaryRT(temp1);

		CommandBufferPool.Release(cmd);
	}
	#endregion

	#region 对外接口

	public void SetCameraBlurParams(BlurConfig config)
	{
		cameraConfig = config;
	}
	#endregion

    private void SwitchBuffer(ref int src, ref int tar)
    {
        int temp = src;
        src = tar;
        tar = temp;
    }
}

```

### 2、Shader 部分
``` hlsl
```


## 四、利用Blur实现UI背景模糊
## 五、直接模糊Texture
## 六、UI裁剪模糊
## 七、毛玻璃模糊效果