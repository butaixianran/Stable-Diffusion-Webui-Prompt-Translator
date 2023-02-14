"use strict";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function prompt_translator(){
    //wait for all tab's ui
    await sleep(3000);
 
    //get prompt element
    //you can not get element from document, must use gradioApp()
    let txt2img_prompt = gradioApp().getElementById("txt2img_prompt").getElementsByTagName("textarea")[0];
    let txt2img_neg_prompt = gradioApp().getElementById("txt2img_neg_prompt").getElementsByTagName("textarea")[0];
    let img2img_prompt = gradioApp().getElementById("img2img_prompt").getElementsByTagName("textarea")[0];
    let img2img_neg_prompt = gradioApp().getElementById("img2img_neg_prompt").getElementsByTagName("textarea")[0];

    if (!txt2img_prompt) {
        console.log("can not find txt2img_prompt");
        return
    }

    if (!txt2img_neg_prompt) {
        console.log("can not find txt2img_neg_prompt");
        return
    }

    if (!img2img_prompt) {
        console.log("can not find img2img_prompt");
        return
    }

    if (!img2img_neg_prompt) {
        console.log("can not find img2img_neg_prompt");
        return
    }
    
    //use txt2img as default
    let prompt = txt2img_prompt;
    let neg_prompt = txt2img_neg_prompt;

    //there are 2 main tabs for prompt, txt2img and img2img.
    //need to find a way check which tab is active
    let tabs = gradioApp().getElementById("tabs");
    if (!tabs) {
        console.log("can not find tabs");
        return
    }

    let txt2img_tab = null;
    let img2img_tab = null;
    //extension's tab
    let pt_tab = null;

    //must get localized text here
    //getTranslation(txt) is a global js function used by SD webui to get localized word
    let txt2img_txt = getTranslation("txt2img");
    if (!txt2img_txt){txt2img_txt = "txt2img"}

    let img2img_txt = getTranslation("img2img");
    if (!img2img_txt){img2img_txt = "img2img"}

    let pt_txt = getTranslation("Prompt Translator");
    if (!pt_txt){pt_txt = "Prompt Translator"}
    

    for (let button of tabs.getElementsByTagName("button")) {
        if (button.innerHTML.trim() == txt2img_txt) {
            txt2img_tab = button
        } else if (button.innerHTML.trim() == img2img_txt) {
            img2img_tab = button
        } else if (button.innerHTML.trim() == pt_txt) {
            pt_tab = button
        }
    }

    if (!txt2img_tab) {
        console.log("can not find txt2img_tab");
        return
    }

    if (!img2img_tab) {
        console.log("can not find img2img_tab");
        return
    }

    if (!pt_tab) {
        console.log("can not find prompt translator tab");
        return
    }

    //add listener to those 3 tabs
    //now, we can know which tab is in active
    let active_tab = "txt2img";
    txt2img_tab.addEventListener('click', () => {
        active_tab = "txt2img";
        prompt = txt2img_prompt;
        neg_prompt = txt2img_neg_prompt;
    })
    
    img2img_tab.addEventListener('click', () => {
        active_tab = "img2img";
        prompt = img2img_prompt;
        neg_prompt = img2img_neg_prompt;
    })

    pt_tab.addEventListener('click', () => {
        active_tab = "pt";
    })

    
    // get extension's tab's component
    let pt_prompt = gradioApp().getElementById("pt_prompt").getElementsByTagName("textarea")[0];
    let pt_translated_prompt = gradioApp().getElementById("pt_translated_prompt").getElementsByTagName("textarea")[0];
    let pt_trans_prompt_btn = gradioApp().getElementById("pt_trans_prompt_btn");
    let pt_send_prompt_btn = gradioApp().getElementById("pt_send_prompt_btn");

    let pt_neg_prompt = gradioApp().getElementById("pt_neg_prompt").getElementsByTagName("textarea")[0];
    let pt_translated_neg_prompt = gradioApp().getElementById("pt_translated_neg_prompt").getElementsByTagName("textarea")[0];
    let pt_trans_neg_prompt_btn = gradioApp().getElementById("pt_trans_neg_prompt_btn");
    let pt_send_neg_prompt_btn = gradioApp().getElementById("pt_send_neg_prompt_btn");

    if (!pt_prompt) {console.log("can not find extension's pt_prompt");return}
    if (!pt_translated_prompt) {console.log("can not find extension's pt_translated_prompt");return}
    if (!pt_trans_prompt_btn) {console.log("can not find extension's pt_trans_prompt_btn");return}
    if (!pt_send_prompt_btn) {console.log("can not find extension's pt_send_prompt_btn");return}

    if (!pt_neg_prompt) {console.log("can not find extension's pt_neg_prompt");return}
    if (!pt_translated_neg_prompt) {console.log("can not find extension's pt_translated_neg_prompt");return}
    if (!pt_trans_neg_prompt_btn) {console.log("can not find extension's pt_trans_neg_prompt_btn");return}
    if (!pt_send_neg_prompt_btn) {console.log("can not find extension's pt_send_neg_prompt_btn");return}


    //swtich native and translated prompt
    let switch_prompt = "";
    let switch_neg_prompt = "";
    function do_switch_prompt(){
        let tmp = switch_prompt;
        switch_prompt = prompt.value;
        prompt.value = tmp;
    }

    function do_switch_neg_prompt(){
        let tmp = switch_neg_prompt;
        switch_neg_prompt = neg_prompt.value
        neg_prompt.value = tmp;
    }



    
    //set toolbar
    let toolbar = document.createElement("div");
    toolbar.id = "prompt_trans_toolbar";
    toolbar.className = "gr-block gr-box relative w-full border-solid border border-gray-200 gr-padded";
    //create buttons
    let trans_prompt_btn = document.createElement("button");
    trans_prompt_btn.id = "trans_prompt_btn";
    trans_prompt_btn.innerHTML = "🗚";
    trans_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // trans_prompt_btn.style.borderColor = "#e5e7eb";
    trans_prompt_btn.style.border = "none";
    trans_prompt_btn.title = "Translate Prompt";

    let trans_neg_prompt_btn = document.createElement("button");
    trans_neg_prompt_btn.id = "trans_neg_prompt_btn";
    trans_neg_prompt_btn.innerHTML = "🗛";
    trans_neg_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // trans_neg_prompt_btn.style.borderColor = "#e5e7eb";
    trans_neg_prompt_btn.style.border = "none";
    trans_neg_prompt_btn.title = "Translate Negative Prompt";

    let switch_prompt_btn = document.createElement("button");
    switch_prompt_btn.id = "switch_prompt_btn";
    switch_prompt_btn.innerHTML = "⇄";
    switch_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // switch_prompt_btn.style.borderColor = "#e5e7eb";
    switch_prompt_btn.style.border = "none";
    switch_prompt_btn.title = "Switch prompt between Native language and English";


    let switch_neg_prompt_btn = document.createElement("button");
    switch_neg_prompt_btn.id = "switch_prompt_btn";
    switch_neg_prompt_btn.innerHTML = "↹";
    switch_neg_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // switch_neg_prompt_btn.style.borderColor = "#e5e7eb";
    switch_neg_prompt_btn.style.border = "none";
    switch_neg_prompt_btn.title = "Switch negative prompt between Native language and English";

    //link to deepl
    let deepl_link = document.createElement("a");
    deepl_link.id = "switch_prompt_btn";
    deepl_link.innerHTML = "d";
    deepl_link.className = "gr-button gr-button-lg gr-button-tool";
    // deepl_link.style.borderColor = "#e5e7eb";
    deepl_link.title = "Link to DeepL";
    deepl_link.href = "https://www.deepl.com/";
    deepl_link.target = "_blank";
    deepl_link.style.border = "none";

    //checkbox for active tab
    let ckb_box = document.createElement("span");

    let ckb = document.createElement("input");
    ckb.type = "checkbox";

    let ckb_label = document.createElement("span");
    ckb_label.innerHTML = " is img2img?";
    ckb_box.appendChild(ckb);
    ckb_box.appendChild(ckb_label);

    //add buttons to toolbar
    toolbar.appendChild(trans_prompt_btn);
    toolbar.appendChild(trans_neg_prompt_btn);
    toolbar.appendChild(switch_prompt_btn);
    toolbar.appendChild(switch_neg_prompt_btn);
    toolbar.appendChild(deepl_link);
    toolbar.appendChild(ckb_box);
    

    //failed, can not get re-newed class name
    //find active tab by tab button's class name
    //if "border-transparent" is not in tab button's class name, then this tab is active
    //then set propmt to that tab's prompt textarea
    function set_prompt_by_active_tab() {
        console.log("set_prompt_by_active_tab");
        if (!txt2img_tab) {
            console.log("txt2img_tab is none");
            return
        }

        if (!img2img_tab) {
            console.log("img2img_tab is none");
            return
        }

        console.log("txt2img_tab.classList:");
        console.log(txt2img_tab.classList);
        console.log(txt2img_tab.className);
        console.log("img2img_tab.classList:");
        console.log(img2img_tab.classList);
        console.log(txt2img_tab.className);
        
        if(!txt2img_tab.classList.contains('border-transparent')){
            console.log('txt2img_tab is active');
            active_tab = "txt2img";
            prompt = txt2img_prompt;
            neg_prompt = txt2img_neg_prompt;

        } else if (!img2img_tab.classList.contains('border-transparent')) {
            console.log('img2img_tab is active');
            active_tab = "img2img";
            prompt = img2img_prompt;
            neg_prompt = img2img_neg_prompt;
        } 

    }

    //add click to checkbox
    ckb.onclick = function(){
        if (ckb.checked) {
            //is img2img
            console.log('use img2img_tab');
            active_tab = "img2img";
            prompt = img2img_prompt;
            neg_prompt = img2img_neg_prompt;            
        } else {
            console.log('use txt2img_tab');
            active_tab = "txt2img";
            prompt = txt2img_prompt;
            neg_prompt = txt2img_neg_prompt;
        }
    };

    //add click to button
    trans_prompt_btn.onclick = function(){

        if (!prompt.value) {
            console.log('text can not be empty');
            return
        }

        //copy prompt to extension tab's prompt
        pt_prompt.value = prompt.value;
        //trigger event
        pt_prompt.dispatchEvent(new Event("input"));
        //trigger extension tab's translation button
        pt_trans_prompt_btn.click();
        //save prompt, which gonna be filled by python side
        switch_prompt = prompt.value;
    };

    trans_neg_prompt_btn.onclick = function(){

        if (!neg_prompt.value) {
            console.log('text can not be empty');
            return
        }

        //copy prompt to extension tab's prompt
        pt_neg_prompt.value = neg_prompt.value;
        //trigger events
        pt_neg_prompt.dispatchEvent(new Event("input"));
        //trigger extension tab's translation button
        pt_trans_neg_prompt_btn.click();
        //save neg prompt, which gonna be filled by python side
        switch_neg_prompt = neg_prompt.value;
    };

    //switch between native and translated language
    switch_prompt_btn.onclick = function(){
        do_switch_prompt();
    };

    switch_neg_prompt_btn.onclick = function(){
        do_switch_neg_prompt();
    };

    //add toolbar to the right side of model bar
    let modelbar = gradioApp().getElementById("quicksettings");
    modelbar.appendChild(toolbar);

})()

