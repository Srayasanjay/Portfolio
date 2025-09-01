document.addEventListener("DOMContentLoaded",()=>{

    const cards=document.querySelectorAll('.project-card');
    cards.forEach((card,index) => {
        const delay=index * 0.2;
        card.style.animationDelay=`${delay}s`;
    });

    //Observer for project cards
    const observer=new IntersectionObserver((entries,observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('animate');
            }else{
                entry.target.classList.remove('animate');
            }
        });
        },{ threshold: 0.4});
    cards.forEach(card => observer.observe(card));

    //scroll to back button
    const backToTop=document.getElementById('back-to-top');

    window.addEventListener('scroll',()=>{
        if(window.scrollY > 300){
            backToTop.classList.add('show');
        }else{
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click',()=>{
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        });
    });
    const scrollContainer=document.querySelector('.h-scroll');
    const leftBtn=document.querySelector('.scroll-button.left');
    const rightBtn=document.querySelector('.scroll-button.right');
    const scrollAmount=350+16; //cardwidth + extra gap

    leftBtn.addEventListener('click', ()=>{
        scrollContainer.scrollBy({
            left:-scrollAmount,
            behavior: 'smooth'
        });
    });
    rightBtn.addEventListener('click', ()=>{
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    //Key expertise
    const buttons=document.querySelectorAll("#domain-buttons button");
    const grids=document.querySelectorAll(".skills-grid > div");

    buttons.forEach(button=>{
        button.addEventListener('click', ()=>{
            const target=button.getAttribute("data-section");
            grids.forEach(grid=>{
                if(grid.id === 'domain-' + target){
                    grid.classList.add("active");
                }else{
                    grid.classList.remove("active");
                }
            });
        });
    });
});