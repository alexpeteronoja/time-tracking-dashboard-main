const links = document.querySelectorAll(".link");
const cards = document.querySelectorAll(".cad");


const timetracker = async() => {

    try {
        const response = await fetch("/data.json");
        const data = await response.json();


        cards.forEach((card, index) => {
            const activities = card.querySelector(".activities");
            const currentHour = card.querySelector(".current-hour");
            const previousHour = card.querySelector(".previous-hour");

            activities.textContent = data[index].title;
            currentHour.textContent = data[index].timeframes.weekly.current + "hrs";
            previousHour.textContent = "Previous - " + data[index].timeframes.weekly.previous + "hrs";


            document.addEventListener("click", (event) => {
                if (event.target.classList.contains("link")) {
                    event.preventDefault();

                    const timeframe = event.target.getAttribute("data-timeframe");

                    cards.forEach((card, index) => {
                        const current = card.querySelector(".current-hour");
                        const previous = card.querySelector(".previous-hour");

                        current.textContent = data[index].timeframes[timeframe].current + "hrs";

                        const shortName = timeframe.replace(/ly$/i, "");
                        const dayShortName = shortName.replace(/i/i, "y");

                        previous.textContent = "Last " + dayShortName + " - " + data[index].timeframes[timeframe].previous + "hrs";
                    })

                    // For Selected Class

                    document.querySelectorAll(".link").forEach((link) => link.classList.remove("selected"));
                    event.target.classList.add("selected");
                }
            });
        });

    } catch (error) {
        console.error("Error fetching data: " + error)
    }
}

timetracker();

const tiltCards = document.querySelectorAll(".tilt-card"); // Ensure correct class name

tiltCards.forEach((card) => {
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave); // Use "mouseleave" instead of "mouseout"
});

function handleMouseEnter(event) {
    const card = event.currentTarget;
    card.style.transition = "transform 0.2s ease"; // Smooth transition
    card.style.transform = "perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05)"; // Tilt effect
    card.querySelector(".card-body").style.backgroundColor = "hsl(235, 45%, 61%)";
}

function handleMouseLeave(event) {
    const card = event.currentTarget;
    card.style.transform = "none"; // Reset transform
    card.querySelector(".card-body").style.backgroundColor = "";
}