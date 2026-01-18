var imageList = ["SQL (1).png", "SQL (2).png", "Python (1).png", "Python (2).png", "Java (1).png", "BI.png", "Problem-Solving.png"];

function generatorCertificates(i){
    const div = document.createElement("div");
    div.className = "certificate-item";
    const img = document.createElement("img");
    img.src = "Certificates/" + imageList[i];
    img.alt = "Certificate " + (i + 1);
    div.appendChild(img);
    document.getElementsByClassName("certificate-items")[0].appendChild(div);
}

function displayCertificates(filter) {
    document.getElementsByClassName("certificate-items")[0].innerHTML = "";
    if (filter === "all") {
        for (var i = 0; i < imageList.length; i++) {
            generatorCertificates(i);
        }
    } else if (filter === "Programming") {
        for (var i = 0; i < imageList.length; i++) {
            if (imageList[i].includes("Python") || imageList[i].includes("Java")) {
                generatorCertificates(i);
            }
        }
    } else if (filter === "Database") {
        for (var i = 0; i < imageList.length; i++) {
            if (imageList[i].includes("SQL") || imageList[i].includes("BI")) {
                generatorCertificates(i);
            }
        }
    } else if (filter === "Problem-Solving") {
        for (var i = 0; i < imageList.length; i++) {
            if (imageList[i].includes("Problem-Solving")) {
                generatorCertificates(i);
            }
        }
    }
}

// Display all certificates on page load
document.addEventListener("DOMContentLoaded", function() {
    displayCertificates("all");
});

// Add click listeners to filter buttons
document.querySelectorAll(".filter-button").forEach(function(button) {
    button.addEventListener("click", function() {
        var filter = this.getAttribute("data-filter");
        displayCertificates(filter);
    });
});