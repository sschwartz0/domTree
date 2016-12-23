
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('X-PINGOTHER', 'pingpong');
    xmlHttp.setRequestHeader('Content-Type', 'application/xml');
    xmlHttp.setRequestHeader('Content-Type', 'application/xml');
    xmlHttp.send(null);
}

let data = [];

// function CopyLink() {
//             window.clipboardData.setData("Text", location.href);
//           }

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    $('#h2').text(url);
    httpGetAsync(url, function(html) {
    	let elements = [];
    		let tagsArr = html.match(/<(.|\n)*?>/gi);
    		for (let i = 0; i < tagsArr.length; i++) {
    			// if (tagsArr[i].includes('<div')) {
    			// 	elements.push(tagsArr[i]);
    			// 	elements.push('div');
    			// } else if (tagsArr[i].includes('/div>')) {
    			// 	elements.push(tagsArr[i]);
    			// 	elements.push('/div');
    			// } else if (tagsArr[i].includes('<p')) {
    			// 	elements.push(tagsArr[i]);
          //   elements.push('p');
          // } else if (tagsArr[i].includes('/p>')) {
          //   elements.push(tagsArr[i]);
          //   elements.push('/p');
    			// } else if (tagsArr[i].includes('<a')) {
    			// 	elements.push(tagsArr[i]);
          //   elements.push('a');
          // } else if (tagsArr[i].includes('/a>')) {
          //   elements.push(tagsArr[i]);
          //   elements.push('/a');
    			// } else
          if (tagsArr[i].includes('<img')) {
    				elements.push(tagsArr[i]);
            elements.push('img');
    			} else if (tagsArr[i].includes('/img>')) {
            elements.push(tagsArr[i]);
            elements.push('/img');
          }
    		}

        //elements array = all elements + attributes, with name (div or /div) after

        for (let i = 0; i < elements.length - 1; i += 2) {
          //increments by 2
          //first check if element being evaluated is an opening or closing tag
          // if (elements[i + 1][0] !== '/') {
            //opening tags
            let obj = {};
            let srcr = '';
            let srcr2 = '';
            // let tempCount = dataCount;
            // obj['name'] = elements[i];
            if (elements[i].substring(elements[i].indexOf("src")).slice(5,7) === "//") {
              srcr = elements[i].substring(elements[i].indexOf("src")).slice(7);
              srcr2 = 'https://' + srcr.slice(0, srcr.indexOf('"'));
            }

            else if (elements[i].substring(elements[i].indexOf("src")).slice(5,6) === "/") {
              srcr = url + elements[i].substring(elements[i].indexOf("src")).slice(5);
              srcr2 = srcr.slice(0, srcr.indexOf('"'));
            }
            else {
              srcr = elements[i].substring(elements[i].indexOf("src")).slice(5);
              srcr2 = srcr.slice(0, srcr.indexOf('"'));
            }
            obj['name'] = '';
            obj['id'] = i;
            obj['src'] = srcr2;
            //checking if the next element is opening or closing
            //need to add children property if opens more
            // if (elements[i + 3][0] !== '/') {
            //   obj['children'] = [];
            // }

            data.push(obj)
          // } else if (elements[i + 1][0] === '/') {
            //closing tags
          // }
        }
        $(function() {

        $('#tree1').tree({
            data: data,
            buttonLeft: true,
            onCreateLi: function(node, $li) {
                // Append a link to the jqtree-element div.
                // The link has an url '#node-[id]' and a data property 'node-id'.
                $li.find('.jqtree-element').append(`<div><img class="image" src="` + node.src + `"></div><a target="_blank" class="imgLink" href="` + node.src + `"><div class="open">Open image in new tab</div></a>`);
            }
        });

        });

    });
});
