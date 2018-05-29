
# h5project

#### 安装运行

>1. h5_app_mobile,前端html页面，React+webpack. <br/>
    npm install / yarn install 初始化，npm start / yarn start 启动代码，访问地址localhost:8080
>2. h5_api,服务端接口，使用nodejs+express+mongoose，需要安装mongodb.<br/>
    npm install / yarn install 初始化，npm start / yarn start 启动代码

#### 项目部署

>1. h5_app_mobile:<br/>
    需要先build项目，yarn build / npm run build 后会在h5_build文件夹中生成build包；<br/>
    再运行startup.sh文件（必须已经安装docker,可docker镜像部署项目）;<br/>
    docker部署后的项目访问端口为8089（如果需要修改可以statup.sh中更改）。
>2. h5_api:<br/>
    startup.sh文件（系统必须已经安装docker,可docker镜像部署项目）<br/>
    docker部署后的服务端接口端口号为3005（如果需要修改可以statup.sh中更改）
