"use strict";

onUiLoaded(() => {
    function getActivePrompt() {
        const currentTab = get_uiCurrentTabContent();
        switch (currentTab.id) {
            case "tab_txt2img":
                return currentTab.querySelector("#txt2img_prompt textarea");
            case "tab_img2img":
                return currentTab.querySelector("#img2img_prompt textarea");
        }
        return null;
    }

    function getActiveNegativePrompt() {
        const currentTab = get_uiCurrentTabContent();
        switch (currentTab.id) {
            case "tab_txt2img":
                return currentTab.querySelector("#txt2img_neg_prompt textarea");
            case "tab_img2img":
                return currentTab.querySelector("#img2img_neg_prompt textarea");
        }
        return null;
    }

    // get extension's tab's component
    let pt_prompt = gradioApp().querySelector("#pt_prompt textarea");
    let pt_translated_prompt = gradioApp().querySelector(
        "#pt_translated_prompt textarea"
    );
    let pt_trans_prompt_btn = gradioApp().getElementById("pt_trans_prompt_btn");
    let pt_trans_prompt_js_btn = gradioApp().getElementById(
        "pt_trans_prompt_js_btn"
    );
    let pt_send_prompt_btn = gradioApp().getElementById("pt_send_prompt_btn");

    let pt_neg_prompt = gradioApp().querySelector("#pt_neg_prompt textarea");
    let pt_translated_neg_prompt = gradioApp().querySelector(
        "#pt_translated_neg_prompt textarea"
    );
    let pt_trans_neg_prompt_btn = gradioApp().getElementById(
        "pt_trans_neg_prompt_btn"
    );
    let pt_trans_neg_prompt_js_btn = gradioApp().getElementById(
        "pt_trans_neg_prompt_js_btn"
    );
    let pt_send_neg_prompt_btn = gradioApp().getElementById(
        "pt_send_neg_prompt_btn"
    );

    if (!pt_prompt) {
        console.log("can not find extension's pt_prompt");
        return;
    }
    if (!pt_translated_prompt) {
        console.log("can not find extension's pt_translated_prompt");
        return;
    }
    if (!pt_trans_prompt_btn) {
        console.log("can not find extension's pt_trans_prompt_btn");
        return;
    }
    if (!pt_trans_prompt_js_btn) {
        console.log("can not find extension's pt_trans_prompt_js_btn");
        return;
    }
    if (!pt_send_prompt_btn) {
        console.log("can not find extension's pt_send_prompt_btn");
        return;
    }

    if (!pt_neg_prompt) {
        console.log("can not find extension's pt_neg_prompt");
        return;
    }
    if (!pt_translated_neg_prompt) {
        console.log("can not find extension's pt_translated_neg_prompt");
        return;
    }
    if (!pt_trans_neg_prompt_btn) {
        console.log("can not find extension's pt_trans_neg_prompt_btn");
        return;
    }
    if (!pt_trans_neg_prompt_js_btn) {
        console.log("can not find extension's pt_trans_neg_prompt_js_btn");
        return;
    }
    if (!pt_send_neg_prompt_btn) {
        console.log("can not find extension's pt_send_neg_prompt_btn");
        return;
    }

    //swtich native and translated prompt
    let switch_prompt = "";
    let switch_neg_prompt = "";
    function do_switch_prompt() {
        const prompt = getActivePrompt();
        if (prompt === null) return;
        const tmp = switch_prompt;
        switch_prompt = prompt.value;
        prompt.value = tmp;
    }

    function do_switch_neg_prompt() {
        const neg_prompt = getActiveNegativePrompt();
        if (prompt === null) return;
        const tmp = switch_neg_prompt;
        switch_neg_prompt = neg_prompt.value;
        neg_prompt.value = tmp;
    }

    //set toolbar
    let toolbar = document.createElement("div");
    // toolbar.id = "prompt_trans_toolbar";
    toolbar.className = "gr-block gr-box relative w-full border-solid border border-gray-200 gr-padded";
    //create buttons
    let trans_prompt_btn = document.createElement("button");
    // trans_prompt_btn.id = "trans_prompt_btn";
    trans_prompt_btn.innerHTML = "🗚";
    trans_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // trans_prompt_btn.style.borderColor = "#e5e7eb";
    trans_prompt_btn.style.border = "none";
    trans_prompt_btn.title = "Translate Prompt";

    let trans_neg_prompt_btn = document.createElement("button");
    // trans_neg_prompt_btn.id = "trans_neg_prompt_btn";
    trans_neg_prompt_btn.innerHTML = "🗛";
    trans_neg_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // trans_neg_prompt_btn.style.borderColor = "#e5e7eb";
    trans_neg_prompt_btn.style.border = "none";
    trans_neg_prompt_btn.title = "Translate Negative Prompt";

    let switch_prompt_btn = document.createElement("button");
    // switch_prompt_btn.id = "switch_prompt_btn";
    switch_prompt_btn.innerHTML = "⇄";
    switch_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // switch_prompt_btn.style.borderColor = "#e5e7eb";
    switch_prompt_btn.style.border = "none";
    switch_prompt_btn.title = "Switch prompt between Native language and English";


    let switch_neg_prompt_btn = document.createElement("button");
    // switch_neg_prompt_btn.id = "switch_neg_prompt_btn";
    switch_neg_prompt_btn.innerHTML = "↹";
    switch_neg_prompt_btn.className = "gr-button gr-button-lg gr-button-tool";
    // switch_neg_prompt_btn.style.borderColor = "#e5e7eb";
    switch_neg_prompt_btn.style.border = "none";
    switch_neg_prompt_btn.title = "Switch negative prompt between Native language and English";

    // target language
    let tar_lang_drop = document.createElement("select");
    tar_lang_drop.className = "gr-box gr-input";
    // tar_lang_drop.style.borderColor = "#e5e7eb";
    tar_lang_drop.style.border = "none";
    tar_lang_drop.title = "Target language";
    // get tar_lang dropdown from extension tab
    let pt_tar_lang_drop = gradioApp().querySelector("#pt_tar_lang select");
    if (pt_tar_lang_drop) {
        // create options
        for (const option of pt_tar_lang_drop.options) {
            let tar_lang_drop_option = document.createElement("option");
            tar_lang_drop_option.value = option.value;
            tar_lang_drop_option.innerHTML = option.value;
            // add to list
            tar_lang_drop.appendChild(tar_lang_drop_option)
        }
    }
    pt_tar_lang_drop.selectedIndex = 0;

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

    //add buttons to toolbar
    toolbar.appendChild(trans_prompt_btn);
    toolbar.appendChild(trans_neg_prompt_btn);
    toolbar.appendChild(switch_prompt_btn);
    toolbar.appendChild(switch_neg_prompt_btn);
    toolbar.appendChild(tar_lang_drop);
    toolbar.appendChild(deepl_link);

    //add onchange to dropdown
    tar_lang_drop.onchange = function(){
        //set tar_lang_drop's value of extension tab
        let pt_tar_lang_drop = gradioApp().querySelector("#pt_tar_lang select");
        if (pt_tar_lang_drop) {
            pt_tar_lang_drop.selectedIndex = tar_lang_drop.selectedIndex
            // trigger event to tell gradio
            pt_tar_lang_drop.dispatchEvent(new Event("change"));
            pt_tar_lang_drop.dispatchEvent(new Event("input"));
        }

    }

    //add click to button
    trans_prompt_btn.onclick = function(){
        const prompt = getActivePrompt();
        if (!prompt.value) {
            console.log('text can not be empty');
            return
        }

        //copy prompt to extension tab's prompt
        pt_prompt.value = prompt.value;
        //trigger event
        pt_prompt.dispatchEvent(new Event("input"));
        //trigger extension tab's translation button
        pt_trans_prompt_js_btn.click();
        //save prompt, which gonna be filled by python side
        switch_prompt = prompt.value;
    };

    trans_neg_prompt_btn.onclick = function(){
        const neg_prompt = getActiveNegativePrompt();
        if (!neg_prompt.value) {
            console.log('text can not be empty');
            return
        }

        //copy prompt to extension tab's prompt
        pt_neg_prompt.value = neg_prompt.value;
        //trigger events
        pt_neg_prompt.dispatchEvent(new Event("input"));
        //trigger extension tab's translation button
        pt_trans_neg_prompt_js_btn.click();
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
});

