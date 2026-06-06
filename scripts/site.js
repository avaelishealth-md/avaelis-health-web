(function(){
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rev=[].slice.call(document.querySelectorAll(".reveal"));
  if(!("IntersectionObserver" in window)||reduced){rev.forEach(function(e){e.classList.add("in");});}
  else{
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("in", e.isIntersecting);});},{threshold:.14});
    rev.forEach(function(e){io.observe(e);});
  }
  // mobile nav hamburger
  document.addEventListener("click",function(e){
    var t=e.target.closest(".navtoggle"); if(t){var h=t.closest("header.nav"); if(h) h.classList.toggle("open"); return;}
    var a=e.target.closest("header.nav nav.lk a"); if(a){var h2=a.closest("header.nav"); if(h2) h2.classList.remove("open");}
  });
})();