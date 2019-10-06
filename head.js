const headData = {
    "charset"     : "utf-8",
    "title"       : "Todo List",
    "meta"        : {
        "name"    : "viewport",
        "content" : ["width=device-width","initial-scale=1"]
    },
    "fontawesome" : {
        "rel"          : "stylesheet",
        "href"         : "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
        "integrity"    : "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr",
        "cross-origin" : "anonymous"
    },
    "customCss"   : {
        "rel"   : "stylesheet",
        "type"  : "text/css",
        "media" : "screen",
        "href"  : "todo.css"
    }
};

// Loop through the content data in the viewport meta tag
let content = ``;
for(let data of headData.meta.content){
    // only add a , to the first array item
    if(data !== "initial-scale=1"){
        content += `${data},`;
    }else{
        content += `${data}`;
    } 
}

// Template for head meta and link data 
const headTemplate = `
    <meta charset="${headData.charset}" />
    <title>${headData.title}</title>
    <meta name="${headData.meta.name}" content="${content}">
    <!-- Font Awesome -->
    <link rel="${headData.fontawesome.rel}" href="${headData.fontawesome.href}" integrity="${headData.fontawesome.integrity}" crossorigin="${headData.fontawesome["cross-origin"]}">
    <!-- Custom Css -->
    <link rel="${headData.customCss.rel}" type="${headData.customCss.type}" media="${headData.customCss.media}" href="${headData.customCss.href}" />`;

    // add all the content to the head tag
    document.head.innerHTML = headTemplate;