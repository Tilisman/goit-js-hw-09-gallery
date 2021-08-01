import imagesSrc from "./gallery-items"
import refs from "./refs"


console.dir(refs.galleryRef);

function createGalleryEl (){
	const imageCollection = [];
	for (let i = 0; i < imagesSrc.length; i++) {
		const gallItemRef = document.createElement('li');
		gallItemRef.classList.add('gallery__item');

		const imgRef = document.createElement('img');
		imgRef.classList.add('gallery__image');
		imgRef.src = imagesSrc[i].preview;
		imgRef.alt = imagesSrc[i].description;
		imgRef.dataset.source = imagesSrc[i].original;
		imgRef.dataset.index = i;
		
		gallItemRef.append(imgRef);	
    imageCollection.push(gallItemRef);
	}
	refs.galleryRef.append(...imageCollection);
}	

refs.galleryRef.addEventListener('click', lightBoxOnClickOpen);

function lightBoxOnClickOpen(e) {
	if(e.target.nodeName !== 'IMG') return;
	
	const src = e.target.dataset.source;

	refs.lightBoxImageRef.src = src;
	refs.lightBoxImageRef.alt = e.target.alt;
	refs.lightBoxImageRef.dataset.index = e.target.dataset.index;
	refs.lightBoxRef.classList.add('is-open');
}
refs.lightBoxCloseBtnRef.addEventListener('click', closeLightBox);
refs.lightBoxOverlayRef.addEventListener('click', closeLightBox);

window.addEventListener('keydown', (e) => {	
	if(e.code === 'Escape') {
		closeLightBox();
	};

	if(e.code === 'ArrowLeft'){	
		arrowLeftClick()
	};

		if(e.key === 'ArrowRight'){
		arrowRightClick()
	};
})

function arrowLeftClick() {

	const currentIndex = Number(refs.lightBoxImageRef.dataset.index);
	if(currentIndex === 0){
		refs.lightBoxImageRef.dataset.index = `${imagesSrc.length - 1}`
		refs.lightBoxImageRef.src = imagesSrc[imagesSrc.length - 1].original; 
		return
	}
refs.lightBoxImageRef.dataset.index = `${currentIndex - 1}`
refs.lightBoxImageRef.src = imagesSrc[currentIndex - 1].original; 
	
}

function arrowRightClick() {

	const currentIndex = Number(refs.lightBoxImageRef.dataset.index);
	if(currentIndex === imagesSrc.length - 1){
		refs.lightBoxImageRef.dataset.index = 0
		refs.lightBoxImageRef.src = imagesSrc[0].original; 
		return
	}
refs.lightBoxImageRef.dataset.index = `${currentIndex + 1}`
refs.lightBoxImageRef.src = imagesSrc[currentIndex + 1].original; 
}



function closeLightBox() {
	refs.lightBoxRef.classList.remove('is-open');
	refs.lightBoxImageRef.src = '';
}


createGalleryEl();