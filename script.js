// ==========================================
// Coaching Survival AI v1.0
// FINAL SCRIPT - PART 1
// ==========================================

// ---------- Variables ----------

let currentPage = 1;
const totalPages = 9;

const progressBar = document.getElementById("progressBar");

const user = {
    name: "Anonymous Hero",
    batch: "",
    subjects: [],
    ratings: {},
    mood: "",
    answer: ""
};

// ---------- Show Page ----------

function showPage(page){

    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active");
    });

    document.getElementById("page"+page).classList.add("active");

    currentPage = page;

    progressBar.style.width =
    ((page-1)/(totalPages-1))*100 + "%";
}

// ---------- Start ----------

document.getElementById("startBtn").onclick = ()=>{

    showPage(2);

};

// ---------- Nickname ----------

document.getElementById("toBatch").onclick = ()=>{

    let name =
    document.getElementById("username").value.trim();

    if(name!="")
        user.name=name;

    showPage(3);

};

// ---------- Batch ----------

document.querySelectorAll(".batchBtn").forEach(btn=>{

    btn.onclick = ()=>{

        user.batch = btn.dataset.batch;

        showPage(4);

    };

});

// ---------- Subjects ----------

document.getElementById("subjectNext").onclick = ()=>{

    user.subjects=[];

    document
    .querySelectorAll("#page4 input[type='checkbox']")
    .forEach(box=>{

        if(box.checked){

            user.subjects.push(box.value);

        }

    });

    if(user.subjects.length==0){

        const funny=[

"😭 Oyee... AI can't analyse invisible subjects!",

"🥺 At least choose ONE subject yaar.",

"💀 Bro skipped every subject... Respect 😂",

"🤖 Error 404 : Subjects Not Found.",

"😂 Even attendance is higher than your selection."

        ];

        alert(

funny[Math.floor(Math.random()*funny.length)]

        );

        return;

    }

    showPage(5);

};

// ---------- Ratings ----------

document.getElementById("ratingNext").onclick = ()=>{

    user.ratings={

        physics:
        document.getElementById("phyRate").value,

        chemistry:
        document.getElementById("chemRate").value,

        maths:
        document.getElementById("mathRate").value,

        biology:
        document.getElementById("bioRate").value

    };

    showPage(6);

};

// ---------- Mood ----------

document.querySelectorAll(".moodBtn").forEach(btn=>{

    btn.onclick = ()=>{

        user.mood = btn.innerText;

        showPage(7);

    };

});
// ==========================================
// FINAL SCRIPT - PART 2
// ==========================================

// ---------- Honest Question ----------

document.getElementById("submitSurvey").onclick = ()=>{

    user.answer =
    document.getElementById("answer").value.trim();

    if(user.answer==""){

        const msgs=[

"🥺 Don't leave the AI hanging... Write something!",

"😂 At least tell us what you'd do if class got cancelled!",

"🤖 Your keyboard looks lonely. Type something!",

"😭 Empty answers make the AI cry."

        ];

        alert(msgs[Math.floor(Math.random()*msgs.length)]);
        return;

    }

    showPage(8);

    startAI();

};

// ---------- AI Loading ----------

const aiLines=[

"🤖 Initializing AI...",

"📚 Reading today's coaching experience...",

"🧠 Counting remaining brain cells...",

"😴 Detecting sleep during lectures...",

"☕ Calculating caffeine requirement...",

"📖 Checking homework risk...",

"🎯 Preparing Survival Report..."

];

function startAI(){

    let i=0;

    const typing=
    document.getElementById("typingArea");

    const loader=
    document.getElementById("loaderBar");

    typing.innerHTML="";
    loader.style.width="0%";

    const timer=setInterval(()=>{

        if(i<aiLines.length){

            typing.innerHTML+=
            aiLines[i]+"<br><br>";

            loader.style.width=
            ((i+1)/aiLines.length)*100+"%";

            i++;

        }else{

            clearInterval(timer);

            setTimeout(()=>{

                showReport();

            },800);

        }

    },900);

}

// ---------- Random Generators ----------

function random(min,max){

    return Math.floor(
        Math.random()*(max-min+1)
    )+min;

}

const achievements=[

"🏆 Coaching Survivor",

"😴 Sleep Fighter",

"☕ Coffee Warrior",

"📚 Homework Slayer",

"🔥 Lecture Legend",

"💀 Still Alive"

];

const aiQuotes=[

"One more day survived. Respect. 😂",

"JEE is hard... but you're harder.",

"Today's pain is tomorrow's result.",

"Keep showing up. That's the real victory.",

"Small progress every day."

];

const snacks=[

"🍕 Pizza",

"🥟 Samosa",

"🍔 Burger",

"🍫 Dairy Milk",

"🍟 French Fries",

"🧋 Bubble Tea"

];
// ==========================================
// FINAL SCRIPT - PART 3
// ==========================================

// ---------- Final Report ----------

function showReport(){

    showPage(9);

    const pain=random(60,98);
    const brain=random(18,90);
    const coffee=random(1,6);
    const homework=random(45,99);

    const achievement=
    achievements[random(0,achievements.length-1)];

    const quote=
    aiQuotes[random(0,aiQuotes.length-1)];

    const snack=
    snacks[random(0,snacks.length-1)];

    document.getElementById("reportContent").innerHTML=`

<div class="report">

<h1>🎉 AI Survival Report</h1>

<div class="reportCard">

<h2>👋 Hello, ${user.name}</h2>

<p><b>🌅 Batch :</b> ${user.batch}</p>

<p><b>📚 Subjects :</b> ${user.subjects.join(", ")}</p>

<p><b>😂 Mood :</b> ${user.mood}</p>

</div>

<div class="reportCard">

<div class="score">${pain}%</div>

<p>🔥 Pain Level</p>

<hr>

<br>

<p>🧠 Brain Cells Left :
<b>${brain}%</b></p>

<p>☕ Coffee Required :
<b>${coffee} Cups</b></p>

<p>📖 Homework Risk :
<b>${homework}%</b></p>

</div>

<div class="reportCard">

<h3>${achievement}</h3>

<p style="margin-top:10px;">
"${quote}"
</p>

</div>

<div class="reportCard">

<h3>🎁 Today's Lucky Snack</h3>

<h2>${snack}</h2>

</div>

<div class="reportCard">

<h3>📝 Honest Answer</h3>

<p>${user.answer}</p>

</div>
};
<button id="restart">
🔄 Try Again
</button>

`;
document
.getElementById("restart")
.onclick=()=>{
    location.reload();
};
document.getElementById("submitBtn")
.addEventListener("click", sendResponse);


const formspreeURL = "https://formspree.io/f/mzdnwwbo";


function sendResponse(){

    let data = {

        username: user.name,

        batch: user.batch,

        subjects: user.subjects.join(", "),

        physics_rating: user.ratings.physics,

        chemistry_rating: user.ratings.chemistry,

        maths_rating: user.ratings.maths,

        biology_rating: user.ratings.biology,

        mood: user.mood,

        answer: user.answer,

        timestamp: new Date().toString()

    };


    fetch(formspreeURL, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

    .then(()=>{
        alert("Response submitted successfully 🚀");
    })

    .catch(error=>{
        console.log(error);
        alert("Submission failed");
    });

}
}


    showPage(1);
