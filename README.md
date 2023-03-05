### Language
[中文](README.cn.md)

# Stable-Diffusion-Webui-Prompt-Translator
This Stable-Diffusion-Webui's extension can translate prompt from your native language into English, so from now on, you can write prompt with your native language.

# Install
GO to SD webui's extension page, choose install from github url. Fill it with this project's url, click install.

(If you can not connect to github, you can just download this project as `.zip` file. Unzip it to `Your Stable-Diffusion-Webui/extensions` folder.)

Then, Reload Stable-Diffusion-Webui. Done. 

# How to use
## Set translation API Key
This extension uses Online AI translator service [Deepl.com](https://www.deepl.com), [Google](https://cloud.google.com/translate/docs/setup?hl=en) or [Baidu](http://api.fanyi.baidu.com/)(for Chinese)'s API to translate your pormpt.  

That means, you need go to those translation website, apply a free API Key for this. Fill your API Key to this extension's tab page, click save, done.

(For baidu, check [README.cn.md](README.cn.md))

### Setup for Deepl
With deepl, it offers you 500,000 character/month for free. That's more than enough.  

After applying the API, go to your acount, the API key is at the bottom like following:
  
![](img/deepl_acount.jpg)

![](img/deepl_appkey.jpg)


After you get your APP Key, fill it into this extension's tab page, then click save. 

### Setup for Google translation API Key [check](https://cloud.google.com/translate/docs/setup?hl=en)
**Note: Google API does not offer any free words per month, and setup is kind of complex for normal user. Only choose google when you can not use other service.**  

![](./img/google-translation-01.png)
![](./img/google-translation-02.png)

1. create GCP project([check](https://cloud.google.com/resource-manager/docs/creating-managing-projects?hl=en))
2. enable "Cloud Translation API" 
    - search "translation" 
    - click "Cloud Translation API"
    - click "ENABLE"
3. create "API Key"
    - after "Cloud Translation API" click "MANAGE"
    - select PROEJCT, and godo "API/Service Details" 
    - click "CREDENTIALS" tab and click "CREATED CREDENTIALS"


If you are in China, just choose [Baidu](http://api.fanyi.baidu.com/). 

**Now, you have 2 ways to translate your prompt:**

## Use extension tab
![extension_tab](img/extension_tab.jpg)

You fill prompt at left side, click translate button, Translated English will be filled to right side.  

You can adujust both of them, then click "Send" button, to send translated English prompt to txt2img and img2img page's prompt.  

Works on negative prompt too.  

## Use the toolbar in txt2img/img2img page
With this toolbar, you can directly translate prompt in txt2img/img2img page, without going to extension page.
![toolbar](img/toolbar.jpg)
Move your mouse onto those buttons, they will show tooltips. Like following:
* Translate Prompt  
![](img/button01.jpg)  
* Translate Negative Prompt  
![](img/button02.jpg)  
* Switch prompt between your native language and translated English  
![](img/button03.jpg)  
![](img/button04.jpg)  
* The "**d**" button is a link to open [Deepl.com](https://www.deepl.com) in a new tab. In case you don't want to apply an APP Key, you still can use it on its website.

> About img2img checkbox on toolbar's screenshot: It is for old version, now we can check it automatically so it is not needed anymore. 

### Usecase
For example,  we filled prompt with asian language, then click "Translate" button. 
![](img/txt2img00.jpg)  

It will translate your prompt then fill translated words back. And save your native language prompt into memory.  
![](img/txt2img01.jpg)  

You can click switch button to switch between your native language prompt and translated English as you wish.  
![](img/txt2img02.jpg)  

Now, you can use the translated English for generating. 

Following is generated images with AI translated English.
![](img/generated_demo.jpg)  



Enjoy!  

# Tip
## Translate one word
Sometime, we've already set prompt in English, then just want to add one word with native language.  

In that case, we can fill that word into negative prompt, translate it, then cut&paste it back to prompt.   

## Security of API Key
If your App key is leaked to other people, you can go to Deepl/Baidu, delete that key and create a new one.    

