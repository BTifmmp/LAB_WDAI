const searchElem = document.getElementById("search");
const orderElem = document.getElementById("order");
const container = document.getElementById("container");

var data = [];

var dataLoaded = [];

function onSearchChange() {
  searchTerm = searchElem.value;
  if (searchTerm == "") {
    data = dataLoaded.slice();
  } else {
    data = dataLoaded.filter((val) =>
      val.description.toUpperCase().includes(searchTerm.toUpperCase())
    );
  }

  updateDisplay();
}

function onOrderChange() {
  if (orderElem.value == "asc") {
    data = data.sort((a, b) => {
      const titleA = a.title.toUpperCase(); // ignore upper and lowercase
      const titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else if (orderElem.value == "desc") {
    data = data.sort((a, b) => {
      const titleA = a.title.toUpperCase(); // ignore upper and lowercase
      const titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else {
    data = dataLoaded.slice();
    onSearchChange();
  }

  updateDisplay();
}

async function loadData() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    dataLoaded = result.products;
    data = dataLoaded.slice();
    updateDisplay();
  } catch (error) {
    console.error(error.message);
  }
}

dataHTML = "";

function updateDisplay() {
  container.innerHTML = "";
  data.forEach((element) => {
    newContainerDiv = document.createElement("div");
    newContainerDiv.className = "product-container";
    newTitleDiv = document.createElement("div");
    newTitleDiv.textContent = element.title;
    newDescDiv = document.createElement("div");
    newDescDiv.textContent = element.description;
    newContainerDiv.appendChild(newTitleDiv);
    newContainerDiv.appendChild(newDescDiv);
    container.appendChild(newContainerDiv);
  });
}

loadData();
