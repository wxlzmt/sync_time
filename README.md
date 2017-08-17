# sync_time
# 同步更新本地计算机时间

## 使用步骤
1. 安装[Node.js](https://nodejs.org/en/)
2. 项目根目录下执行命令```npm install``` 安装项目必须的module
3. 运行```run.bat``` 或命令 ```node sync_time.js```


日志在目录:```logs/```

## 增强使用方式
windows下使用```at```建立定时任务,定时执行```run.bat```
**此时需要使用绝对路径**
创建文件 ```auto.bat``` , 内容如下:
```
at 08:30 "F:\GitHub\sync_time\run.bat"
at 11:00 "F:\GitHub\sync_time\run.bat"
at 15:00 "F:\GitHub\sync_time\run.bat"
at 17:30 "F:\GitHub\sync_time\run.bat"
```
放到```C:\Users\%username%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup```
目录下.



>end
