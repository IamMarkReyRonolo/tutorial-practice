const learnerForm = document.getElementById("learnerForm");
const learnerNameInput = document.getElementById("learnerNameInput");
const submitButton = document.getElementById("submitBtn");
const learners = document.getElementById("learners");

let learnerStorage;

getData();
displayData();

function getData() {
	if (localStorage.getItem("learners")) {
		learnerStorage = JSON.parse(localStorage.getItem("learners"));
	} else {
		learnerStorage = [];
	}
}

function displayData() {
	learnerStorage.forEach((learner) => {
		displayLearner(learner);
	});
}

function addData() {
	learnerStorage.push(learnerNameInput.value);
	localStorage.setItem("learners", JSON.stringify(learnerStorage));
}

function removeData(name) {
	learnerStorage = learnerStorage.filter((learner) => {
		return learner != name;
	});

	localStorage.setItem("learners", JSON.stringify(learnerStorage));
}

function displayLearner(name) {
	const learner = document.createElement("li");
	const learnerName = document.createElement("p");
	const deleteBtn = document.createElement("button");

	learner.className = "learner";
	deleteBtn.className = "deleteBtn";

	learnerName.textContent = name;
	deleteBtn.textContent = "Delete";

	learner.appendChild(learnerName);
	learner.appendChild(deleteBtn);
	learners.appendChild(learner);
}

learnerForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (learnerStorage.includes(learnerNameInput.value)) {
		alert("Duplicate Invalid");
	} else if (learnerNameInput.value == "") {
		alert("Input invalid");
	} else {
		displayLearner(learnerNameInput.value);
		addData(learnerNameInput.value);
	}

	learnerNameInput.value = "";
});

learners.addEventListener("click", (e) => {
	if (e.target.classList.contains("deleteBtn")) {
		const name = e.target.previousSibling.textContent;
		removeData(name);
		const learner = e.target.parentElement;
		learners.removeChild(learner);
	}
});
