window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-down');
    if (window.scrollY > 100) {
      scrollButton.style.display = 'none';
    } else {
      scrollButton.style.display = 'block';
    }
  });
  window.onload = function() {
    const gifs = document.querySelectorAll('.gif');
    let currentGifIndex = 0;
    
    function playNextGif() {
      gifs[currentGifIndex].style.display = 'none'; 
      currentGifIndex = (currentGifIndex + 1) % gifs.length; 
      
      gifs[currentGifIndex].style.display = 'block'; 
      setTimeout(playNextGif, 2000); 
    }
    
    playNextGif();
  };
  