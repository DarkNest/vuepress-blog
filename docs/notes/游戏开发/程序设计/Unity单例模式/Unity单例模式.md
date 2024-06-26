﻿单例模式
===
单例模式代码设计如下所示
``` csharp

public abstract class SingletonMono<T> : MonoBehaviour where T : SingletonMono<T>
{
    private static T instance;
    public static T Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<T>();
                if (instance == null)
                {
                    GameObject obj = new GameObject(typeof(T).Name);
                    instance = obj.AddComponent<T>();
                }
            }
            return instance;
        }
    }

    private void Awake()
    {
        if (instance != null && instance != this)
        {
            Debug.LogWarning("重复单例：" + this.GetType().FullName);
            Destroy(gameObject);
        }
        else
        {
            instance = this as T;
            DontDestroyOnLoad(this.gameObject);
        }
    }

    private void OnDestroy()
    {
        instance = null;
    }
}
```