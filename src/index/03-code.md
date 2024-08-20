---
# 这是文章的标题
title: AList魔改示例教程
# 这是页面的图标
icon: fa-solid fa-rocket-launch
# 这是侧边栏的顺序
order: 30
# 设置作者
author: 甜甜
# 设置写作时间
date: 2023-01-01
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - AList魔攻教程
  - 自己编译
  - 其他玩法
  - Code
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
# footer: true

# 你可以自定义版权信息
# copyright: 无版权
headerDepth: 6
---

<!-- 你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。 -->

<!-- more -->

## **前言**

虽然默认的也挺好的，但是吧就是想折腾折腾，就魔改了一下前端嘿嘿

以下代码是我自己魔改了前端的一些地方，虽然可能位置和行数不太对，大概浮动的地方不会差很大的.

如果需要修改的话自己clone前端代码哦，可以[**在线调试**](build/kaifa.md)，具体怎么调试也很简单

:::: tip

提供 v50懒人包 付款备注附带你的联系方式，然后 [<i class="fa-solid fa-envelope"></i> 联系我](mailto:anwen_anyi@foxmail.com)

::: details v50 使用

主要是想使用，但是懒得编译的用户 或者不会编译的用户

![](/touwei.png)

:::

::::

下面我们先随便修改个加载缓冲试试水呗~

## **1. 先修改 Loading 试试水**

源码文件位置：**alist-web\src\components\FullLoading.tsx**

查看**hope**文档链接：https://hope-ui.com/docs/feedback/spinner

::: details 点击查看示例代码

```tsx
  {/* 主要修改内容为 color的参数 具体看上方提到的参数吧 分别大概为11/38/61行 */}
    <Center h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        //主页圆形加载蓝色条
        emptyColor="tomato"
        //emptyColor="$neutral4"
        //color="tomato"
        color={getMainColor()}
        size="xl"
      />
    </Center>

    <Center ref={props.ref} h="$full" w="$full" py={merged.py}>
      <Spinner
        thickness={`${merged.thickness}px`}
        speed="0.65s"
        //目录白色条
        emptyColor="tomato"
        //emptyColor="$neutral4"
        //color="tomato"
        color={getMainColor()}
        size={merged.size as any}
      />
    </Center>
    
    <Center w="$full" h="$full">
      {/* 左上角logo加载颜色 */}
      <Spinner color="tomato" {...props} />
    </Center>
```

:::

#### **修改后的对比预览图：**

![](/img/code/1.png)

<br/>

## **2. 修改并且取消在加密码情况下的出现的登录按钮**

修改取消原因:修改了登录界面和后台入口的地址防止泄露，[**如何修改登录地址和后台地址**](#修改后台地址和登录地址)

源码文件位置：**alist-web\src\pages\home\Password.tsx**

```tsx
{/* 上面是原来的 下面是我自己改的，大概位置在48行，找不到可以用浏览器搜索 */}
          {/* <Text>{t("global.have_account")}</Text> */}
          {/* <Text
            color="$info9"
            as={LinkWithBase}
            href={`/@login?redirect=${encodeURIComponent(location.pathname)}`}
          >
            {t("global.go_login")}
          </Text> */}


          <Text>{t("不公开去要密码或离开")}</Text>
```

#### **修改后的对比预览图：**

![](/img/code/2.png)

<br/>

## **3.修改了不登录的后台显示**

源码文件位置：**alist-web\src\pages\manage\users\Profile.tsx**

::: details 点击查看示例代码

```tsx
{/* 58行开始修改,可查关键字 */}
              <AlertIcon mr="$2_5" />
              {/* <AlertTitle mr="$2_5">{t("users.guest-tips")}</AlertTitle> */}
              <Text>{t("洗洗睡吧不公开")}</Text>
              <Text>{t("点击左侧回到主页")}</Text>
              {/* <AlertDescription>{t("users.modify_nothing")}</AlertDescription> */}
            </Alert>
            <HStack spacing="$2">
              {/* <Text>{t("global.have_account")}</Text> */}
              {/* <Text>{t("洗洗睡吧不公开")}</Text> */}
              {/* <Text
                color="$info9"
                as={LinkWithBase}
                href={`/@login?redirect=${encodeURIComponent(
                  location.pathname
                )}`}
              >
                {t("global.go_login")}
              </Text> */}
              {/* 图片内容可以自己换或者不要都行 */}
              <img src="http://pic.rmb.bdstatic.com/bjh/705fab74d0dfc00bae9166288f23b4dc.png" width="50%" height ="50%"></img>
            </HStack>
            {/* <HStack spacing="$2">
              <img src="https://cdn.jsdelivr.net/gh/alist-org/logo@main/logo.svg" width="40%" height ="40%"></img>
            </HStack> */}

          </>
        }
      >


      {/* 137行左右,可查关键词,原来位置显示的内容,红色字体的哪种权限,我这里隐藏了 */}
      {/* <HStack wrap="wrap" gap="$2" mt="$2">
        <For each={UserPermissions}>
          {(item, i) => (
            <PermissionBadge can={UserMethods.can(user(), i())}>
              {t(`users.permissions.${item}`)}
            </PermissionBadge>
          )}
        </For>
      </HStack> */}
```

:::

#### **修改后的对比预览图：**

![](/img/code/3.png)

<br/>

## **4. 取消游客访问和语言选择的按钮默认为简体中文**

#### 如何改成默认为简体中文：

- 首先先拉取中文语言包，丢进去初始化一下，具体怎么初始化点击这里查看教程 ==> [**win版**](build/win.md#_1-4-手动下载语言包地址)，[**Linux版**](build/linux.md#_1-4-下载语言文件并且初始化)

- 然后英语(en)的直接删除了即可，语言文件夹里面只剩下了 lang/zh_cn 这个中文的 这样就会默认使用中文的

::: details <i class="fa-solid fa-lightbulb fa-bounce" style="color: orange;"></i> 删除英文语言文件后的错误

```javascript{1}
index.c125b016.js:formatted:25798 Uncaught (in promise) TypeError: Is[or] is not a function
    at index.c125b016.js:formatted:25798:28
    at index.c125b016.js:formatted:25801:6
    at index.c125b016.js:formatted:20388:25
    at D_ (index.c125b016.js:formatted:25805:12)
    at index.c125b016.js:formatted:796:19
    at Tt (index.c125b016.js:formatted:262:9)
    at y (index.c125b016.js:formatted:796:12)
    at get children [as children] (index.c125b016.js:formatted:25903:48)
    at Object.fn (index.c125b016.js:formatted:1059:36)
    at Fs (index.c125b016.js:formatted:440:15)
```

这个错误是因为AList默认是英文文件的 你删除了它就找不到了

复现方式：十分简单将浏览器的语言切换成英文，然后打开`AList`就会看到

- 暂时解决办法
  1. 将en语言包加回来，把里面的改成中文
  2. 将en也加回来，也把中文加一起
- 推荐第一种办法，把`en`里面的都删掉替换成中文的文件，或者直接把中文文件夹改成`en`都可以

:::


源码文件位置：**alist-web\src\pages\login\index.tsx**

```tsx{2-14,18}
        {/* 177行，取消游客访问 */}
        {/* <Button
          w="$full"
          colorScheme="accent"
          onClick={() => {
            changeToken()
            to(
              decodeURIComponent(searchParams.redirect || base_path || "/"),
              true
            )
          }}
        >
          {t("login.use_guest")}
        </Button> */}


          {/* 198行，Ctrl+F查下面的源码关键字修改，取消语言选择 */}
          {/* <SwitchLanguageWhite /> */}

```

#### **修改后的对比预览图：**

![](/img/code/4.png)

<br/>

## **5.删除"本地设置"里面的语言切换按钮，已经默认为中文**

如何默认中文，看上面我的[查看操作](#_4-取消游客访问和语言选择的按钮默认为简体中文)，只留下中文的话如果你浏览器语言是英文的浏览器会报错 :point_right: [解决办法](#_4-取消游客访问和语言选择的按钮默认为简体中文)

源码文件位置：**alist-web\src\pages\home\toolbar\LocalSettings.tsx**

```tsx{2}
              {/* 第65行隐藏即可 */}
              {/* <SwitchLanguageWhite /> */}
```

#### **修改后的对比预览图：**

![](/img/code/5.png)

<br/>

## **6. 将本地设置里面的夜间/白天 切换模式和刷新按钮(刷新需要登录)移动到主页**

文件位置：**alist-web\src\pages\home\toolbar\Right.tsx**

夜间模式使用的代码位置：**alist-web\src\components\SwitchColorMode.tsx**

::: details 点击查看示例代码

```tsx
//添加到头部引入那里
// 下面这两条搬过来的代码
import { FiSun as Sun } from "solid-icons/fi";
import { FiMoon as Moon } from "solid-icons/fi";

  // 从这里到下面注释 都是搬过来的夜间模式切换代码,看代码知道加到那里吧？
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(
    {
      size: "$8",
      component: Moon,
      p: "$0_5",
    },
    {
      size: "$8",
      component: Sun,
      p: "$0_5",
    }
  );
  // 到这里


  

    {/* 将设置移动出来,已经没用了这个.... */}
     {/* <Show
        when={isOpen()}
        fallback={
          <RightIcon
              as={AiOutlineSetting}
              tips="local_settings"
              onClick={() => {
                bus.emit("tool", "local_settings");
              }}
            />
        }
      >  
      </Show> */}
      {/* 刷新按钮移动出来 */}
    <VStack spacing="$1" class="left-toolbar-in">
      <Show when={isFolder() && (userCan("write") || objStore.write)}>
        <RightIcon
          as={RiSystemRefreshLine}
          tips="refresh"
          onClick={() => {
            refresh(undefined, true);
          }}
          />
      </Show>    
    </VStack>
      
      {/* 夜间白天模式切换,搜下面的那个class关键词就知道这个加那里了 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
              // 图标已更换
              as={icon().component}
              // tips="白天夜间模式切换"
              onClick={toggleColorMode}
            />
        }
      >  
      </Show>
      
      {/* 以上代码加到这个原有的设置上面即可 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            class="toolbar-toggle"
            as={CgMoreO}
            onClick={() => {
              onToggle();
            }}
          />
        }
      >
```

:::

### 不会加,可以参考这里的完整代码

::: details 点击查看完整代码示例

```tsx{35-47,71-95,126-134}
import {
  Box,
  createDisclosure,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@hope-ui/solid";
import { createMemo, Show } from "solid-js";
import { RightIcon } from "./Icon";
import { CgMoreO } from "solid-icons/cg";
import { TbCheckbox } from "solid-icons/tb";
import { objStore, State, toggleCheckbox, userCan } from "~/store";
import { bus } from "~/utils";
import { operations } from "./operations";
import { IoMagnetOutline } from "solid-icons/io";
import { AiOutlineCloudUpload, AiOutlineSetting } from "solid-icons/ai";
import { RiSystemRefreshLine } from "solid-icons/ri";
import { usePath } from "~/hooks";
import { Motion } from "@motionone/solid";

// 下面这两条搬过来的代码
import { FiSun as Sun } from "solid-icons/fi";
import { FiMoon as Moon } from "solid-icons/fi";

export const Right = () => {
  const { isOpen, onToggle } = createDisclosure({
    defaultIsOpen: localStorage.getItem("more-open") === "true",
    onClose: () => localStorage.setItem("more-open", "false"),
    onOpen: () => localStorage.setItem("more-open", "true"),
  });
  const margin = createMemo(() => (isOpen() ? "$4" : "$5"));
  const isFolder = createMemo(() => objStore.state === State.Folder);
  const { refresh } = usePath();
  // 从这里到下面注释 都是搬过来的夜间模式切换代码
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(
    {
      size: "$8",
      component: Moon,
      p: "$0_5",
    },
    {
      size: "$8",
      component: Sun,
      p: "$0_5",
    }
  );
  // 到这里
  return (
    <Box
      class="left-toolbar-box"
      pos="fixed"
      right={margin()}
      bottom={margin()}
    >
      {/* 将设置移动出来,已经没用了这个.... */}
      {/* <Show
        when={isOpen()}
        fallback={
          <RightIcon
              as={AiOutlineSetting}
              tips="local_settings"
              onClick={() => {
                bus.emit("tool", "local_settings");
              }}
            />
        }
      >  
      </Show> */}
      {/* 刷新按钮移动出来 */}
      <VStack spacing="$1" class="left-toolbar-in">
        <Show when={isFolder() && (userCan("write") || objStore.write)}>
          <RightIcon
            as={RiSystemRefreshLine}
            tips="refresh"
            onClick={() => {
              refresh(undefined, true);
            }}
          />
        </Show>
      </VStack>

      {/* 夜间白天模式切换 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            // 图标已更换
            as={icon().component}
            // tips="白天夜间模式切换"
            onClick={toggleColorMode}
          />
        }
      >
      </Show>
      {/* 原有的设置 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            class="toolbar-toggle"
            as={CgMoreO}
            onClick={() => {
              onToggle();
            }}
          />
        }
      >
        <VStack
          class="left-toolbar"
          p="$1"
          rounded="$lg"
          spacing="$1"
          // shadow="0px 10px 30px -5px rgba(0, 0, 0, 0.3)"
          // bgColor={useColorModeValue("white", "$neutral4")()}
          bgColor="$neutral1"
          as={Motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          // @ts-ignore
          transition={{ duration: 0.2 }}
        >
          <VStack spacing="$1" class="left-toolbar-in">
            <Show when={isFolder() && (userCan("write") || objStore.write)}>
              {/* <Add /> */}
              {/* 原本的刷新按钮隐藏了 */}
              {/* <RightIcon
                as={RiSystemRefreshLine}
                tips="refresh"
                onClick={() => {
                  refresh(undefined, true);
                }}
              /> */}
              <RightIcon
                as={operations.new_file.icon}
                tips="new_file"
                onClick={() => {
                  bus.emit("tool", "new_file");
                }}
              />
              <RightIcon
                as={operations.mkdir.icon}
                p="$1_5"
                tips="mkdir"
                onClick={() => {
                  bus.emit("tool", "mkdir");
                }}
              />
              <RightIcon
                as={AiOutlineCloudUpload}
                tips="upload"
                onClick={() => {
                  bus.emit("tool", "upload");
                }}
              />
            </Show>
            <Show when={isFolder() && userCan("offline_download")}>
              <RightIcon
                as={IoMagnetOutline}
                pl="0"
                tips="offline_download"
                onClick={() => {
                  bus.emit("tool", "offline_download");
                }}
              />
            </Show>
            <RightIcon
              tips="toggle_checkbox"
              as={TbCheckbox}
              onClick={toggleCheckbox}
            />
            {/* 设置隐藏,移动出去 */}
            <RightIcon
              as={AiOutlineSetting}
              tips="local_settings"
              onClick={() => {
                bus.emit("tool", "local_settings");
              }}
            />
          </VStack>
          <RightIcon tips="more" as={CgMoreO} onClick={onToggle} />
        </VStack>
      </Show>
    </Box>
  );
};

```

:::

#### **修改后的对比预览图：**

![](/img/code/6.png)

<br/>

## **7.将登录页面的 "登录到" 隐藏，后期适配自己的使用**

源码文件位置：**alist-web\src\pages\login\index.tsx**

```tsx{2-6}
  const title = createMemo(() => {
    // 33行左右取消后台显示的 登录到 字样
    // ${t("login.login_to")} 汉化包里面的登录到字样 "login_to": "登录到",
    // ${getSetting("site_title")} 网站标题
    // return `${t("login.login_to")}`
    // return `${t("login.login_to")} ${getSetting("site_title")}`
    return `${getSetting("site_title")}`
  })
```

#### **修改后的对比预览图：**

![](/img/code/7.png)

<br/>

## **8.ipa界面添加下载和复制链接按钮,同时添加巨魔安装按钮**

源码文件位置：**alist-web\src\pages\home\previews\ipa.tsx**

两个按钮来自 **alist-web\src\pages\home\previews\download.tsx**

==巨魔安装相关的已经合并，大于 v3.13.1 以上的版本会实装(不包含 v3.13.1==

::: details 点击查看示例代码

```tsx{20,38-51,64-70}
// import { Button } from "@hope-ui/solid"
import { Button, HStack } from "@hope-ui/solid"
import { createSignal } from "solid-js"
// import { useT } from "~/hooks"
import { ObjStore, objStore } from "~/store"
import { api, baseName, safeBtoa } from "~/utils"
import { FileInfo } from "./info"
import { useCopyLink, useLink, useT } from "~/hooks"



const Ipa = () => {
  const t = useT()
  const [installing, setInstalling] = createSignal(false)
  const [trInstalling, setTrInstalling] = createSignal(false)
  const { copyCurrentRawLink } = useCopyLink()
  const { currentObjLink } = useLink()
  return (
    <FileInfo>
      <HStack spacing="$2">
        {/* 原生IPA安装 */}
        <Button
          as="a"
          href={
            "itms-services://?action=download-manifest&url=" +
            `${api}/i/${safeBtoa(
              encodeURIComponent(objStore.raw_url) +
                "/" +
                baseName(encodeURIComponent(objStore.obj.name))
            )}.plist`
          }
          onClick={() => {
            setInstalling(true)
          }}
        >
          {t(`home.preview.${installing() ? "installing" : "install"}`)}
        </Button>
        {/* 巨魔测试 | use install TrollStore IPA*/}
        <Button
          as="a"
          colorScheme="primary"
          href={
            "apple-magnifier://install?url=" +
            encodeURIComponent(currentObjLink(true))
          }
          onClick={() => {
            setTrInstalling(true)
          }}
        >
          {t(`home.preview.${trInstalling() ? "tr-installing" : "tr-install"}`)}
        </Button>

        {/* 从这里到
        下载按钮文件拷贝的位置
          alist-web\src\pages\home\previews\download.tsx
         primary  青绿色
         accent   紫色
         neutral  灰色
         success  绿色
         info     无？
         warning  橙色
         danger   红色
         */}
        <Button colorScheme="danger" as="a" href={objStore.raw_url} target="_blank">
          {t("home.preview.download")}
        </Button>
        <Button colorScheme="accent" onClick={() => copyCurrentRawLink(true)}>
          {t("home.toolbar.copy_link")}
        </Button>
      </HStack>
      {/* 到这里 还有开头的 <HStack spacing="$2"> 都是自己加的 */}
    </FileInfo>
  )
}

export default Ipa
```

:::

#### 目前仅支持 .ipa文件 若想支持 .tipa文件需要添加

源码路径：**alist-web\src\pages\home\previews\index.ts**

需要将 tipa文件也添加进去

```tsx{3}
	{
    name: "Ipa",
    exts: ["ipa","tipa"],
    component: lazy(() => import("./ipa")),
  },
```

.tipa 文件添加图标样式

源码路径：**alist-web\src\utils\icon.ts** 

添加一下后缀文件名在里面即可

```tsx{1}
  "dmg,ipa,plist,tipa": BsApple,
```

#### **修改后的对比预览图：**

![](/img/code/8.png)

<br/>

## **9. 去掉底部内容（有原因的）**

这里去掉还是有原因的，因为我们修改了后台地址和登录地址

但是呢不知道出于什么原因，我们修改了后台管理地址，但是输入 **URL/@manage** 还是能进入默认界面，虽然进入了默认界面，提示路径不对，也不知道账号密码，但是通过CSS自定义的内容全部失效了，底部的登录（管理）入口出现了，暴露了我们修改后的 登录（管理）地址

特此直接从根将这个能暴露我们后台登录地址的信息除掉

**但是要自己在底部自定义一个底部信息哦 保留一下版权信息**

源码文件位置：**alist-web\src\pages\home\Footer.tsx**

```tsx
	{/*
      <HStack spacing="$1">
        <Anchor href="https://github.com/Xhofe/alist" external>
          {t("home.footer.powered_by")}
        </Anchor>
        <span>|</span>
        <AnchorWithBase
          as={Link}
          href={UserMethods.is_guest(user()) ? "/@login" : "/@manage"}
        >
          {t(
            UserMethods.is_guest(user()) ? "login.login" : "home.footer.manage"
          )}
        </AnchorWithBase>
      </HStack>
	*/}
 
```

#### **修改后的对比预览图：**

![](/img/code/9.png)

<br/>

## **10. 添加一个infuse播放器(3.9.2版本移植到官方内了)**

在底部添加一个新的播放器，“infuse”IOS上面用的人挺多的 支持的格式好像也挺多.

infuse官网：[Firecore - Video Player for iOS, Apple TV, and Mac](https://firecore.com/)

 ==(新)源码文件位置：**alist-web/src/pages/home/previews/[video_box.tsx](https://github.com/alist-org/alist-web/blob/main/src/pages/home/previews/video_box.tsx#L17-L21)**==

(旧)源码文件位置：**alist-web\src\pages\home\previews\video.tsx**

```tsx{4-8}
const players: { icon: string; name: string; scheme: string }[] = [
  { icon: "iina", name: "IINA", scheme: "iina://weblink?url=$durl" },
  { icon: "potplayer", name: "PotPlayer", scheme: "potplayer://$durl" },
    {
    icon: "infuse",
    name: "Infuse",
    scheme: "infuse://x-callback-url/play?url=$durl",
  },
  { icon: "vlc", name: "VLC", scheme: "vlc://$durl" },
  { icon: "nplayer", name: "nPlayer", scheme: "nplayer-$durl" },
  {
    icon: "mxplayer",
    name: "MX Player",
    scheme:
      "intent:$durl#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end",
  },
  {
    icon: "mxplayer-pro",
    name: "MX Player Pro",
    scheme:
      "intent:$durl#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end",
  },
]
```

加好后我们给他一个图标，图标的文件夹位置是：**alist-web\public\images** 

可以下载右侧的这个图片或者自己弄一个，格式是  **.webp** 格式的哦~  [**点击蓝色这里查看图片保存**](https://down.onmicrosoft.cn/oss/u20221115822a1936_1669345226327_12955142_file.webp)

保存下来后记得命名成 **infuse.webp** 

**如何自己做一个webp格式的图片，我用的PS做的，然后加一个插件:** https://blog.csdn.net/kangweijian/article/details/125197799

#### **修改后的对比预览图：**

![](/img/code/10.png)

<br/>

## **11. 修改一下搜索，变的更加匹配** ✅

- **开启搜索框需要先在`AList`将索引打开启用才可以显示搜索框,否则看不到，[点击查看如何使用](https://alist.nn.ci/zh/guide/advanced/search.html#如何使用)**

搜索有两个版本一个是最新的一个是v3.6.0及之前的

使用的图标库地址：[**https://solid-icons.vercel.app/search/search**](https://solid-icons.vercel.app/search/search)

::: details 此版本用于最新版搜索源码修改

源码文件位置：**alist-web\src\pages\home\header\Header.tsx**

**很简单，主要是将46行-72行隐藏这是原来的**

**然后添加新的代码74-102行代码**

**代码中使用了其他的图标库，觉得不好看的可以自行修改并且记得导入不然会报错**

```tsx{47-102}
import {
  HStack,
  useColorModeValue,
  Image,
  Center,
  Icon,
  Kbd,
  IconButton,
} from "@hope-ui/solid"
import { Show, Switch, Match } from "solid-js"
import { getMainColor, getSetting, layout, objStore, State } from "~/store"
import { BsSearch } from "solid-icons/bs"
import { CenterLoading } from "~/components"
import { Container } from "../Container"
import { bus } from "~/utils"
import { Layout } from "./layout"
import { AiOutlineFileSearch } from "solid-icons/ai"
import { TbListSearch } from "solid-icons/tb"
import { CgImage } from "solid-icons/cg"

export const Header = () => {
  const logos = getSetting("logo").split("\n")
  const logo = useColorModeValue(logos[0], logos.pop())
  return (
    <Center
      class="header"
      w="$full"
      // shadow="$md"
    >
      <Container>
        <HStack
          px="calc(2% + 0.5rem)"
          py="$2"
          w="$full"
          justifyContent="space-between"
        >
          <HStack class="header-left" h="44px">
            <Image
              src={logo()!}
              h="$full"
              w="auto"
              fallback={<CenterLoading />}
            />
          </HStack>
          <HStack class="header-right" spacing="$2">
            <Show when={objStore.state === State.Folder}>
              {/* <HStack
                aria-label="Search"
                // 背景色
                bg="$neutral4"
                // 长度
                // w="$32"
                // 方框
                p="$2"
                // 圆角
                rounded="$md"
                color={getMainColor()}
                justifyContent="space-between"
                border="2px solid transparent"
                cursor="pointer"
                _hover={{
                  borderColor: "$info6",
                }}
                onClick={() => {
                  bus.emit("tool", "search")
                }}
              >
                <Icon as={AiOutlineFileSearch} />
                <HStack>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </HStack>
              </HStack> */}
              <IconButton
                aria-label="Search"
                compact
                size="lg"
                // 自带的搜索原本只能显示两个图标下面的换成了三个
                // icon={
                //   <Show when={layout() === "list"} fallback={<TbListSearch />}>
                //     <AiOutlineFileSearch /> 
                //   </Show>
                // }
                
                //这次支持三个不同的图标了
                icon={
                  <Switch>
                    <Match when={layout() === "list"}>
                      <TbListSearch />
                    </Match>
                    <Match when={layout() === "grid"}>
                      <AiOutlineFileSearch />
                    </Match>
                    <Match when={layout() === "image"}>
                      <CgImage />
                    </Match>
                  </Switch>
                }
                onClick={() => {
                  bus.emit("tool", "search")
                }}
              />
              {/* 搜索右侧的那个变换的按钮 */}
              <Layout />
            </Show>
          </HStack>
        </HStack>
      </Container>
    </Center>
  )
}
```

:::

::: details 仅限于V3.6.0版本搜索

源码文件位置：**alist-web/src/pages/home/Header.tsx**

主要是将原本自带的隐藏了，重新做一个，看起来比较适配。

也可以根据是图标模式和列表模式变换图标，哈哈如果觉得不好看，可以把两个图标改成一样的就行。

上述使用的图标库地址：[**https://solid-icons.vercel.app/search/search**](https://solid-icons.vercel.app/search/search)

```tsx
          <HStack class="header-right" spacing="$2">
            <Show when={objStore.state === State.Folder}>
              {/* 隐藏自带的搜索准备重建一个 */}
              {/* <HStack
                bg="$neutral4"
                w="$32"
                p="$2"
                rounded="$md"
                justifyContent="space-between"
                border="2px solid transparent"
                cursor="pointer"
                _hover={{
                  borderColor: "$info6",
                }}
                onClick={() => {
                  bus.emit("tool", "search")
                }}
              >
                <Icon as={BsSearch} />
                <HStack>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </HStack>
              </HStack> */}

              {/*普通搜索*/}
              <IconButton
                aria-label="Search"
                compact
                size="lg"
                icon={
                  {/*TbListSearch 和 AiOutlineFileSearch 是图标，觉得不好看可以自己换*/}
                  <Show when={layout() === "list"} fallback={<TbListSearch />}>
                    <AiOutlineFileSearch />
                  </Show>
                }
                onClick={() => {
                  bus.emit("tool", "search")
                }}
              />
              {/*切换按钮*/}
              <IconButton
                aria-label="switch layout"
                compact
                size="lg"
                icon={
                  <Show when={layout() === "list"} fallback={<FaSolidListUl />}>
                    <BsGridFill />
                  </Show>
                }
                onClick={() => {
                  setLayout(layout() === "list" ? "grid" : "list")
                }}
              />
            </Show>
          </HStack>
```

:::

#### **修改后的对比预览图：**

![](/img/code/11.png)

![](/img/code/11-2.gif)

<br/>

## **12.修改文件图标**

源码文件位置：**alist-web\src\utils\icon.ts**

图标库：https://solid-icons.vercel.app/

::: details 点击查看示例代码

```tsx
import {
  BsFileEarmarkWordFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkPptFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkFontFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkMinusFill,
  BsApple,
  BsWindows,
  BsFileEarmarkZipFill,
  BsMarkdownFill,
  BsFiletypeYml,
  BsFiletypeXml
} from "solid-icons/bs"
import { 
  SiAdobephotoshop, 
  SiAdobepremierepro,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiAdobeaudition,
  SiAdobeindesign,
  SiTypescript,
  SiGnubash,
  SiJavascript,
  SiPhp
} from "solid-icons/si"
import {
  FaSolidDatabase,
  FaSolidBook,
  FaSolidCompactDisc,
} from "solid-icons/fa"
import { IoFolder } from "solid-icons/io"
import { ImAndroid } from "solid-icons/im"
import { Obj, ObjType } from "~/types"
import { ext } from "./path"
import { FaBrandsGolang,FaBrandsJava,FaBrandsPython } from 'solid-icons/fa'
import { BiSolidFileJson,BiSolidFileCss,BiSolidFileHtml } from 'solid-icons/bi'

//下面是我使用的图标示例，也要添加上面对应的库导入进来喔
const iconMap = {
  "dmg,ipa,plist,tipa": BsApple,
  "exe,msi": BsWindows,
  "zip,gz,rar,7z,tar,jar,xz": BsFileEarmarkZipFill,
  apk: ImAndroid,
  "db,db-shm,db-wal,sql": FaSolidDatabase,
  md: BsMarkdownFill,
  epub: FaSolidBook,
  iso: FaSolidCompactDisc,
  m3u8: BsFileEarmarkPlayFill,
  "doc,docx": BsFileEarmarkWordFill,
  "xls,xlsx,csv": BsFileEarmarkExcelFill,
  "ppt,pptx": BsFileEarmarkPptFill,
  pdf: BsFileEarmarkPdfFill,
  // Adobe
  "psd,pdd": SiAdobephotoshop,
  prproj: SiAdobepremierepro,
  "ai,ait,eps,epsf,ps": SiAdobeillustrator,
  aep: SiAdobeaftereffects,
  sesx: SiAdobeaudition,
  indd: SiAdobeindesign,
  // code
  go: FaBrandsGolang,
  java: FaBrandsJava,
  pnp:SiPhp,
  "py,pyc,pyo,pyi,pyw,pyd,pyx": FaBrandsPython,
  "ts,tsx": SiTypescript, 
  "yaml,yml,toml": BsFiletypeYml,
  xml:BsFiletypeXml,
  sh: SiGnubash,
  json: BiSolidFileJson,
  "js,mjs,cjs": SiJavascript,
  css:BiSolidFileCss,
  html:BiSolidFileHtml,
}
```

:::

#### **修改后的对比预览图：**

![](/img/code/12.png)

<br/>

## **13.给后台登录的按钮添加颜色（可使用主颜色）**

**源码文件位置^1-左侧语言选项按钮^**：**alist-web\src\components\SwitchLanguage.tsx**

- 按钮位置分布：前端本地设置，登录页面，AList后台左侧边栏

**源码文件位置^2-中间切换夜间/白色按钮^**：**alist-web\src\components\SwitchColorMode.tsx**

- 按钮位置分布：前端本地设置，登录页面，AList后台左侧边栏

**源码文件位置^3-右侧单点登录按钮^**：**alist-web\src\pages\login\SSOLogin.tsx**

- 按钮位置分布：登录页面

**源码文件位置^4-右侧WebAuthn登录按钮^**：**alist-web\src\pages\login\index.tsx**

- 按钮位置分布：登录页面

<br/>

- 使用主颜色：指的是在AList后台设置的颜色，路径 -->`AList后台` --> 设置 --> 样式 --> **`主颜色`**
- 用固定颜色：指的是直接在源码中写死

| 方法\优缺点 |       优点       |                      缺点                      |
| :---------: | :--------------: | :--------------------------------------------: |
|    固定     | 可以设置不同颜色 |                更换只能重新编译                |
|   主颜色    |  可以随时换颜色  | 和前端显示的图标颜色统一可能不适合登录页面背景 |



-----

#### 使用主颜色

::: tabs#login-color

@tab 语言选项

```tsx{1,7}
import { getMainColor } from "~/store"

......
......

export const SwitchLanguageWhite = () => (
  <SwitchLanguage as={IoLanguageOutline} color={getMainColor()} boxSize="$8" />
)
```

@tab 模式切换

```tsx{1,13}
import { getMainColor } from "~/store"

......
......

  return (
    <Icon
      cursor="pointer"
      boxSize={icon().size}
      as={icon().component}
      onClick={toggleColorMode}
      // 给图标加个颜色 color={getMainColor()}
      color={getMainColor()}
      p={icon().p}
    />
  )
```

@tab 单点登录

```tsx{1,8}
import { getMainColor } from "~/store"

......
......

    return (
      // 给图标加个颜色 color={'red'}
      <Icon cursor="pointer" color={getMainColor()} boxSize="$8" as={icon} p="$0_5" onclick={login} />
    )

```

@tab WebAuthn

```tsx{9}
import { getMainColor } from "~/store"

......
......

          <SSOLogin />
          <Show when={AuthnSignEnabled}>
            <Icon
              color={getMainColor()}
              cursor="pointer"
              boxSize="$8"
              as={IoFingerPrint}
              p="$0_5"
              onclick={AuthnSwitch}
            />
          </Show>
```

:::

#### 用固定颜色

::: tabs#login-color

@tab 语言选项

```tsx{2}
export const SwitchLanguageWhite = () => (
  <SwitchLanguage as={IoLanguageOutline} color={"$accent10"} boxSize="$8" />
)
```

@tab 模式切换

```tsx{8}
  return (
    <Icon
      cursor="pointer"
      boxSize={icon().size}
      as={icon().component}
      onClick={toggleColorMode}
      // 给图标加个颜色 color={'red'},双引号 单引号都可以
      color={'red'}
      p={icon().p}
    />
  )
```

@tab 单点登录

```tsx{3}
    return (
      // 给图标加个颜色 color={'red'},双引号 单引号都可以
      <Icon cursor="pointer" color={'red'} boxSize="$8" as={icon} p="$0_5" onclick={login} />
    )
```

@tab WebAuthn

```tsx{4}
          <SSOLogin />
          <Show when={AuthnSignEnabled}>
            <Icon
              color={getMainColor()}
              cursor="pointer"
              boxSize="$8"
              as={IoFingerPrint}
              p="$0_5"
              onclick={AuthnSwitch}
            />
          </Show>
```

:::

**修改后的对比预览图：**

翻译忘记截图了，我这里预览图不显示翻译是因为我之前已经删掉了，

::: tabs#login-color

@tab 使用主颜色

![](/img/code/13-huodong.png)

@tab 用固定颜色

![](/img/code/13-guding.png)

:::

虽然只改了这几个，不过像后台左侧边栏和前端设置里面的应该是同理方法


<br/>

## **14.修改默认为某"视图"方式**

首页默认视图为 "列表 list" 格式，有的小伙伴想着默认为 "网格格式" 怎么办呢? 改源码呗....

源码文件位置：**alist-web\src\store\obj.ts**

```ts{2}
export type LayoutType = "list" | "grid" | "image"
const [layout, setLayout] = createStorageSignal<LayoutType>("layout", "list")
```

大概在177行左右，可能有变化会浮动代码行数，代码是不会变的

默认这里是 **"list"** ，如果你要默认为  "网格视图" 自己改成  **"grid"** 即可，"image" 是图片视图估计没人默认用

#### **修改后的对比预览图：**

就像这样的上面是网格视图 下面的是列表视图，默认是列表视图的哦~如果你要改图标可以看[**图标如何修改**](#_12-修改文件图标)

![](/img/code/14.png)



## **15.修改PWA内容**

现在支持将网页通过`PWA`添加到桌面了,但是添加的图标不是很好看的样子,

具体如预览中最后的那个图标,没处理好背景颜色黑乎乎的~我们自己修改一下

源码<Badge text="1" type="info" vertical="middle" />修改的好像是IOS的，源码<Badge text="2" type="info" vertical="middle" />是修改的安卓的~

源码文件位置1：**alist-web\index.html**

把原本的第三行(高亮显示的)改成自己的链接，或者使用和我同款的

```html{3}
    <link
      rel="apple-touch-icon"
      href="https://jsd.nn.ci/gh/alist-org/logo@main/logo.png"
    />
```

> 和我同款图标链接：**https://pic.rmb.bdstatic.com/bjh/aff9c9c8817d943d6857a73188958d45.jpeg**

源码文件位置2：**alist-web\public\static\manifest.json**

老规矩，一样是修改第八行(高亮位置)改成自己的链接，或者使用和我同款的

```json{8}
{
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "name": "AList",
  "icons": [
    {
      "src": "https://jsd.nn.ci/gh/alist-org/logo@main/logo.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

> 和我同款图标链接：**https://pic.rmb.bdstatic.com/bjh/aff9c9c8817d943d6857a73188958d45.jpeg**

#### **修改后的对比预览图：**

上面的是IOS，下面的是安卓

下图第三个是修改 **`后`** 的图标，第四个是修改 **`前`** 的图标

![](/img/code/15-1.png)

下图第一个是修改 **`后`** 的图标，第二个是修改 **`前`** 的图标，安卓的倒是没黑乎乎

![](/img/code/15-2.jpg)



## **$ 修改后台地址和登录地址**

就没代码了，自己批量替换即可~

==**@login**== 是登录地址，==**@manage**== 是后台地址

#### **修改后的对比预览图：**


<div class="image-preview">
  <img src="/img/code/x.png" />
  <img src="/img/code/xx.png" />
</div>