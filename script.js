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

// ===== Added =====
// Global object to hold the ONE report generated per session.
// This is filled exactly once inside startAI() -> generateReport(),
// and reused everywhere (website report, Google Sheet, email)
// so the numbers never change between what the user sees and what is stored.
let currentReport = null;
// ===== End Added =====

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

// ===== Modified =====
// This button (id="submitSurvey", labeled "Analyze Me 🤖" in the HTML) is now
// the ONLY action the user ever clicks. It triggers the full automatic flow:
// Loading -> Generate Report -> Save to Google Sheet -> Send Email -> Show Report.
// No separate "Submit" step exists anymore; everything happens behind startAI().
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
// ===== End Modified =====

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

// ===== Modified =====
// After the typing animation finishes, we now:
// 1. Generate the report ONCE (generateReport()) and store it in currentReport.
// 2. Await sendResponse() (Google Sheet + Email) using that same currentReport.
// 3. Only show the report on the website if submission succeeds.
// If submission fails, the report is NOT shown to the user.
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

setTimeout(async ()=>{

    // Generate the report exactly once and store it globally.
    generateReport();

    try{

        // Wait for Google Sheet + Email to succeed BEFORE showing the report.
        await sendResponse();

        showReport();

    } catch(error){

        console.log(error);

        // Required failure behaviour: do NOT show the report.
        alert("Unable to submit response.\nPlease check your internet connection.");

        // Send the user back to the question page so they can retry
        // without losing their previously entered answer.
        showPage(7);

    }

},800);
        }

    },900);

}
// ===== End Modified =====

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

// ===== Added =====
// Generates the survival report values ONE time per session and stores them
// in the global currentReport object. Every consumer (website report,
// Google Sheet, email) reads from this same object afterwards, so the
// numbers the user sees always match what gets stored/emailed.
function generateReport(){

    currentReport = {

        pain: random(60,98),
        brain: random(18,90),
        coffee: random(1,6),
        homework: random(45,99),

        achievement: achievements[random(0, achievements.length-1)],
        quote: aiQuotes[random(0, aiQuotes.length-1)],
        snack: snacks[random(0, snacks.length-1)]

    };

}
// ===== End Added =====

// ==========================================
// FINAL SCRIPT - PART 3
// ==========================================

// ---------- Final Report ----------

// ===== Modified =====
// showReport() no longer generates its own random values. It now reads
// everything from currentReport, which was created once in generateReport()
// and already sent to the Google Sheet / email by sendResponse().
function showReport(){

    showPage(9);

    if(!currentReport){
        // Safety net: this should never happen in normal flow,
        // but avoids a crash if showReport() is ever called too early.
        generateReport();
    }

    const {pain, brain, coffee, homework, achievement, quote, snack} = currentReport;

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

<button id="restart">
🔄 Try Again
</button>

`;

document
.getElementById("restart")
.onclick=()=>{

    // ===== Added =====
    // Clear the stored report before reloading so a fresh session
    // always starts with currentReport = null.
    currentReport = null;
    // ===== End Added =====

    location.reload();
};
};
// ===== End Modified =====

window.addEventListener("load",()=>{

    showPage(1);

});



const apiURL= "https://script.google.com/macros/s/AKfycbyTOWkdbZJ0RpSjzH1_-rG3pHc8Ei2kfaWcRfUdZrE5t2XVp5arJg20GgDDT4Ejb2U/exec";


// ===== Modified =====
// sendResponse() no longer generates its own random pain/brain/coffee/homework
// or picks its own achievement/quote/snack. It now uses the SAME currentReport
// object that was already generated once in generateReport(), so the Google
// Sheet and email always match exactly what the user sees on the website.
//
// It also now explicitly returns a Promise (via async/await + fetch) and
// re-throws on failure so startAI() can await it and decide whether to
// show the report or show the failure alert instead.
async function sendResponse(){

    if(!currentReport){
        // Safety net in case sendResponse() is ever called out of order.
        generateReport();
    }

    const {pain, brain, coffee, homework, achievement, quote, snack} = currentReport;

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

        pain,
        brain,
        coffee,
        homework,
        achievement,
        quote,
        snack,

        timestamp: new Date().toLocaleString()

    };

    // fetch() itself returns a Promise; awaiting it here means sendResponse()
    // (an async function) also returns a Promise that resolves on success
    // and rejects (throws) on failure, exactly as required.
const response = await fetch(apiURL,{

    method:"POST",

    body:JSON.stringify(data)

});

const result = await response.json();

console.log(result);

if(!result.success){

    throw new Error(result.error || "Unknown Error");

}
}
// ===== End Modified =====
