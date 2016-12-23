'use strict';


$.get( "http://vinylwindows.co", function( html ) {
	let elements = [];
		let tagsArr = html.match(/<(.|\n)*?>/gi);
		for (let i = 0; i < tagsArr.length; i++) {
			if (tagsArr[i].includes('<div')) {
				elements.push(tagsArr[i]);
				elements.push('div');
			} else if (tagsArr[i].includes('/div>')) {
				elements.push(tagsArr[i]);
				elements.push('/div');
			} else if (tagsArr[i].includes('<p')) {
				elements.push(tagsArr[i]);
        elements.push('p');
      } else if (tagsArr[i].includes('/p>')) {
        elements.push(tagsArr[i]);
        elements.push('/p');
			} else if (tagsArr[i].includes('<a')) {
				elements.push(tagsArr[i]);
        elements.push('a');
      } else if (tagsArr[i].includes('/a>')) {
        elements.push(tagsArr[i]);
        elements.push('/a');
			} else if (tagsArr[i].includes('<img')) {
				elements.push(tagsArr[i]);
        elements.push('img');
			} else if (tagsArr[i].includes('/img>')) {
        elements.push(tagsArr[i]);
        elements.push('/img');
      }
		}

    //elements array = all elements + attributes, with name (div or /div) after

    let data = [];
    for (let i = 0; i < elements.length - 1; i += 2) {
      //increments by 2
      //first check if element being evaluated is an opening or closing tag
      if (elements[i + 1][0] !== '/') {
        //opening tags
        let obj = {};
        let tempCount = dataCount;
        obj['name'] = elements[i + 1];
        obj['id'] = i;
        obj['src'] = elements[i];
        //checking if the next element is opening or closing
        //need to add children property if opens more
        if (elements[i + 3][0] !== '/') {
          obj['children'] = [];
        }

        data.push(obj)
      } else if (elements[i + 1][0] === '/') {
        //closing tags
      }
    }
		console.log(elements);
		// res.end(JSON.stringify(elements));

  alert( "Load was performed." );
});
