$(document).ready(function(){

    // 마우스 휠을 아래로 굴리면 한바닥아래 섹션으로 부드럽게 이동
    // 마우스 휠을 위로 굴리면 하바닥위 섹션으로 부드럽게 이동
    // 마우스를 어디에 대고 휠을 굴려?? -> 섹션
  let coin=false
    
    $(window).scroll(function(){
      
        let sct= 0
        sct = $(window).scrollTop()
        let introY = sct/7   //이동거리
        let csct =0 
        csct = $(window).height()
      // console.log(sct)
      // console.log(sct/csct)
      if(sct>=csct){
        $('header').addClass('top')
        $('header').css('transform',`translate(-50%,0px)`)
    }
    if(sct<csct){
        $('header').removeClass('top')
        $('header').css('transform',`translate(-50%,${introY}px)`)
    }
   if(sct/csct>=2){
      $('.des_b').addClass('play')
   }else if(sct/csct<=1.7){
    $('.des_b').removeClass('play')
    
   }
   if(coin==false){
        if(sct/csct>=4){
          $('.belt').addClass('ani')
          setTimeout(function(){$('.belt_close_btn>button').addClass('on')},8000)
          coin = true
      }
    }
    if(sct/csct<=3){
      $('.belt').removeClass('ani')
  }
  
  if(sct>0){
    $('.top_btn').addClass('on')
  }else if(sct == 0){
  $('.top_btn').removeClass('on')
  }
//  $('.top_btn.on').click(function(){
//   window.scrollTo(0,0)
  
//  })
 $('.top_btn.on').click(function() {
  $('body,html').animate({scrollTop:0},800);
 }); 
      
        
    
    })
    $('.belt_close_btn').click(function(){
      $('.belt').removeClass('ani')

    })


    //가져온거
    // $(window).on("scroll",function(){
    //   var $header = $("header");
    //   var $scrollTop = $(window).scrollTop();
    //   if($scrollTop < $(window).height()){
    //     $header.removeClass("top");
    //     var $top = $(window).height()-$header.outerHeight();
    //     var $header_p = $top+($header.outerHeight()*($scrollTop/$(window).height()));
    //     $header.css({
    //       "top":$header_p
    //     });
    //   }else{
    //     $header.addClass("top");
    //   }})
      //가져온거
    let dark_Status = false
    $('.dark_m').click(function(){
        if(dark_Status==false){
            $('body').addClass('dark')
            dark_Status=true
        }
        else{
            $('body').removeClass('dark')
            dark_Status=false
        }        
    })

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————

  const phrases = [
    'HTML & CSS',
    'JavaScript',
    'jQuery',
    'Photoshop',
    'TypeScript',
    
  ]

  const el = document.querySelector('.skill-text')
  const fx = new TextScramble(el)

  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }

  next()    

})