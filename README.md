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
This extension uses Online AI translator service [Deepl.com](https://www.deepl.com) or [Baidu](http://api.fanyi.baidu.com/)(for Chinese)'s API to translate your pormpt.  

That means, you need go to those translation website, apply a free API Key for this.  

With deepl, it offers you 500,000 character/month for free. That's more than enough.  

After applying the API, go to your acount, the API key is at the bottom like following:
  
![](img/deepl_acount.jpg)

![](img/deepl_appkey.jpg)

If you are in China, just choose [Baidu](http://api.fanyi.baidu.com/). 

After you get your APP Key, fill it into this extension's tab page, then click save. 

Now, you have 2 ways to translate your prompt:

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

If you go to img2img, you need to check the checkbox on toolbar. Otherwise this extension can not know which tab is active. And check it to off, after you're back to txt2img tab. 

![](img/img2img.jpg)  

Enjoy!  

# Tip
## Translate one word
Sometime, we've already set prompt in English, then just want to add one word with native language.  

In that case, we can fill that word into negative prompt, translate it, then cut&paste it back to prompt.   

## Security of API Key
If your App key is leaked to other people, you can go to Deepl/Baidu, delete that key and create a new one.    

