// ==UserScript==
// @name        Plurk in new tab
// @description	將 Plurk 連結開啟於新分頁
// @namespace   https://github.com/eight04
// @match       https://www.plurk.com/m/*
// @exclude-match https://www.plurk.com/m/p/*
// @exclude-match https://www.plurk.com/m/search*
// @version     0.1.0
// @author		eight <eight04@gmail.com> (https://github.com/eight04)
// @homepage	https://github.com/eight04/plurk-new-tab
// @supportURL	https://github.com/eight04/plurk-new-tab/issues
// @license		MIT
// @compatible firefox Tampermonkey, Violentmonkey, Greasemonkey 4.11+
// @compatible chrome Tampermonkey, Violentmonkey
// @grant       GM_openInTab
// ==/UserScript==

unsafeWindow.addEventListener("click", e => {
  let url;
  let el;

  if ((el = e.target.closest("a.pictureservices"))) {
    // img link
    url = el.href;
  } else if ((el = e.target.closest("[class*=button], a"))) {
    // btn, other links
    return;
  } else if ((el = e.target.closest(".plurk"))) {
    // plurk
    const {plurkId} = el.__vue__.$options.propsData;
    url = new URL(`p/${plurkId.toString(36)}`, location.href).href
  }

  if (url) {
    e.preventDefault();
    e.stopPropagation();
    GM_openInTab(url, {active: true});
  }
}, true);
