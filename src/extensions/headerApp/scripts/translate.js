import * as $ from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
$(function () {
  function appendGoogTransToUrl() {
    var currentUrl = window.location.href;
    // Check if the URL already contains "googTrans"
    if (currentUrl.indexOf("#googtrans") === -1) {
      // Append the string to the URL
      var newUrl = currentUrl + "#googtrans(en|fr)";
  
      // Load the new URL
      window.location.href = newUrl;
    }
  }
  function onInit() {
    window['googleTranslateElementInit'] = () => {
      // tslint:disable-next-line:no-unused-expression
      new google.translate.TranslateElement({ pageLanguage: 'fr', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    };
    return SPComponentLoader.loadScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', {
      globalExportsName: 'google'
    });
  }
  // function triggerHtmlEvent(element, eventName) {
  //   var event;
  //   if (typeof (Event) === 'function') {
  //     event = new Event(eventName, { bubbles: true, cancelable: true });
  //   } else {
  //     event = document.createEvent('HTMLEvents');
  //     event.initEvent(eventName, true, true);
  //   }
  //   element.dispatchEvent(event);
  // }
  $('.lang-select').on('click', function () {
    var theLang = $(this).attr('data-lang');
    $('.goog-te-combo').val(theLang);
    window.location = $(this).attr('href');
    location.reload();
  });
  function googleTranslateElementInit() {
    // new google.translate.TranslateElement({ pageLanguage: 'fr' }, 'google_translate_element');
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
    // Create a container for the translation widget
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    // this.domElement.appendChild(container);
  }
  function translateBUtt() {
    var buttonfrench = document.getElementById('french');
    var buttonenglish = document.getElementById('english');
  
    buttonfrench.addEventListener('click', function() {
      var currentUrl = window.location.href;
  
      if (currentUrl.indexOf("#googtrans(en|fr)") === 1) {
  
      var newUrl = currentUrl;
  
      window.location.href = newUrl;
      }
  
      else if (currentUrl.indexOf("#googtrans(fr|en)") === 1) {
        // Append the string to the URL        
        var newUrl = currentUrl.replace('#googtrans(fr|en)', '#googtrans(en|fr)');
        // Load the new URL
        window.location.href = newUrl;
      }
    });
  
    buttonenglish.addEventListener('click', function() {
      var currentUrl = window.location.href;
  
      if (currentUrl.indexOf("#googtrans(fr|en)") === 1) {
  
      var newUrl = currentUrl;
  
      window.location.href = newUrl;
      }
  
      else if (currentUrl.indexOf("#googtrans(en|fr)") === 1) {
        // Append the string to the URL        
        var newUrl = currentUrl.replace('#googtrans(en|fr)', '#googtrans(fr|en)');
        // Load the new URL
        window.location.href = newUrl;
      }
    });
  }
  translateBUtt();
  appendGoogTransToUrl();
  onInit();
  // triggerHtmlEvent();
  googleTranslateElementInit();
})
window.addEventListener('load', function () {
  try {
    document.getElementById(':0.container').style.visibility = 'hidden';
    document.getElementById('goog-gt-').style.visibility = 'hidden';
    document.getElementById('goog-gt-').style.display = 'none';
  } catch (error) {
    setTimeout(() => {
      document.getElementById(':0.container').style.visibility = 'hidden';
      document.getElementById('goog-gt-').style.visibility = 'hidden';
      document.getElementById('goog-gt-').style.display = 'none';
    }, 2000);
  }
});
