function(instance, properties) {
    const box = $('<img src="//dd7tel2830j4w.cloudfront.net/f1590845337690x504669748028708350/Screenshot%202020-05-30%20at%2015.28.30.png"/>')
    instance.canvas.append(box);
    box.css('position','absolute');
    box.css('height', properties.bubble.height);
    box.css('width', properties.bubble.width); 
}