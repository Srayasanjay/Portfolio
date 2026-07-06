console.log("SCRIPT STARTED");
// Firebase Imports

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase Configuration

const firebaseConfig = {
    apiKey: "AIzaSyD3qBTxcThk7lm58HrTN9iOWi6ovh4unTo",
    authDomain: "sraya-sanjay-portfolio.firebaseapp.com",
    projectId: "sraya-sanjay-portfolio",
    storageBucket: "sraya-sanjay-portfolio.firebasestorage.app",
    messagingSenderId: "171128117292",
    appId: "1:171128117292:web:1afa398b64c1d2024bd989",
    measurementId: "G-JFBNW2W1EY"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

console.log("🔥 Firebase Initialized");



// Test Firestore Connection

async function testFirebase() {

    try {

        const pollRef = doc(db, "Poll", "ideaFuel");

        const snap = await getDoc(pollRef);

        if (snap.exists()) {

            console.log("✅ Connected to Firestore!");
            console.log(snap.data());

        } else {

            console.log("❌ Poll document not found.");

        }

    } catch (error) {

        console.error("🔥 Firebase Error:", error);

    }

}

testFirebase();


// Everything else

document.addEventListener("DOMContentLoaded",()=>{

    //Mode Change

    const curMode=document.querySelectorAll(".mode-btn");
    console.log(curMode.length);
    const body=document.querySelector("body");
    curMode.forEach(mode => {
        mode.addEventListener("click",()=>{
            console.log("clicked", mode.id);
            if(mode.id==="light"){
                curMode.forEach(btn => btn.classList.remove("cur-mode"));
                mode.classList.add("cur-mode");
                body.classList.add("light-mode");
                body.classList.remove("dark-mode");
            }else{
                curMode.forEach(btn => btn.classList.remove("cur-mode"));
                mode.classList.add("cur-mode");
                body.classList.add("dark-mode");
                body.classList.remove("light-mode");
            }
        });
    });

    //Animation of girl
    const girl=document.getElementById("blinking-girl");
    const blinkimg=new Image();
    blinkimg.src="Logo/Animation Bio/bio girl closed eyes.png";

    function blinking(){
        girl.src=blinkimg.src;

        setTimeout(()=>{
            girl.src="Logo/Animation Bio/bio girl open eyes.png";
        },200);
    }
    setInterval(blinking,4000);
    
    
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

    //Carousel scroll buttons
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

    //Custom cursor
    const cursor=document.querySelector('.cursor');

    document.addEventListener("mousemove",(event)=> {
        cursor.style.left=event.clientX+ "px";
        cursor.style.top=event.clientY+"px";
    });
    
    //Navigation bar
    const sections=document.querySelectorAll("section");

    window.addEventListener("scroll",()=>{
        const currentY=window.scrollY;
        sections.forEach((section,index)=>{
                const nextsection=sections[index+1];
                const navLink=document.querySelector(`a[href="#${section.id}"]`);
                const navImg=navLink.querySelector("img");

                if(currentY>=section.offsetTop-200 && currentY<nextsection.offsetTop-200){
                   
                    navImg.classList.add("active-nav");
                }
                else{
                    navImg.classList.remove("active-nav");
                }
        });
    });

    //Projects navigation

    const projButtons=document.querySelectorAll("#proj-buttons-flex button");
    const projType=document.querySelectorAll(".proj-subtypes > div");
    console.log(projType.length);
    projButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            console.log("clicked");
            const target=button.getAttribute("data-section");

            projType.forEach(subtype=>{
                if(subtype.id===target){
                    console.log("MATCH");
                    subtype.classList.remove("hidden-proj");
                }else{
                    subtype.classList.add("hidden-proj");
                   
                }
            });
        });
    });

    //Miniproj expansion
    const expandBtns=document.querySelectorAll(".miniproj-expand-btn");
    expandBtns.forEach(btn => {
        btn.addEventListener("click",()=>{
            btn.closest(".miniproj-card").classList.toggle("expanded");
        });
    });

    const collapseBtns=document.querySelectorAll(".miniproj-collapse-btn");
    collapseBtns.forEach(btn => {
        btn.addEventListener("click",()=>{
            btn.closest(".miniproj-card").classList.toggle("expanded");
        });     
    });


    //Poll
    async function displayVotes() {
        const pollRef = doc(db, "Poll", "ideaFuel");
        const snap = await getDoc(pollRef);

        if (!snap.exists()) {
            console.log("Document not found.");
            return;
        }

        const data = snap.data();
        
        const totalVotes=
        (data.coffee || 0)+
        (data.music || 0)+
        (data.outdoor || 0)+
        (data.latenight || 0)+
        (data.other || 0);

        const pollBars=document.querySelectorAll(".poll-fill");
        pollBars.forEach(bar=>{
            for(let opt in data){
                if(opt+"-fill"==bar.id){
                    bar.style.width=((data[opt]/totalVotes)*100+"%")
                    bar.parentElement.querySelector(".vote-percent").textContent=Math.round(data[opt]/totalVotes*100)+"%";
                }
            }
        });
    }
    async function vote(option) {

        const pollRef = doc(db, "Poll", "ideaFuel");

        await updateDoc(pollRef, {
            [option]: increment(1)
        });

    }

    const pollOptions = document.querySelectorAll(".poll-option");
    let hasVoted = false;
    pollOptions.forEach(option => {

        option.addEventListener("click", async () => {
            if(hasVoted) return;
            
            //else
            const selected = option.dataset.option;
            console.log("Selected:", selected);
            await vote(selected);
            await displayVotes();
            
            hasVoted = true;
            //poll bar animation
            const pollSectn=document.querySelector("#poll-section");
            pollSectn.classList.add("poll-completed");
        });
    });

    displayVotes();

});