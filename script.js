// 食材リストを管理
let ingredients = [];

// ページ読み込み時のイベント設定
window.addEventListener("DOMContentLoaded", () => {
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const ingredientInput = document.getElementById("ingredientInput");
  const ingredientList = document.getElementById("ingredientList");
  const toggleOptionsBtn = document.getElementById("toggleOptionsBtn");
  const optionsContainer = document.getElementById("optionsContainer");
  const createRecipeBtn = document.getElementById("createRecipeBtn");

  // 食材追加ボタン
  addIngredientBtn.addEventListener("click", () => {
    addIngredient(ingredientInput, ingredientList);
  });

  // Enterキーでも追加
  ingredientInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(ingredientInput, ingredientList);
    }
  });

  // オプション表示切り替え
  toggleOptionsBtn.addEventListener("click", () => {
    optionsContainer.classList.toggle("collapsed");
    toggleOptionsBtn.textContent = optionsContainer.classList.contains("collapsed")
      ? "詳細オプションを表示"
      : "詳細オプションを隠す";
  });

  // レシピ作成ボタン
  createRecipeBtn.addEventListener("click", () => {
    const requestData = gatherRequestData();
    console.log("■ 送信データ:", requestData);

    // API呼び出し
    generateRecipe(requestData)
      .then((recipe) => {
        displayRecipe(recipe);
      })
      .catch((error) => {
        console.error(error);
        alert("レシピ生成に失敗しました。");
      });
  });
});

// 食材追加
function addIngredient(inputElem, listElem) {
  const value = inputElem.value.trim();
  if (value) {
    ingredients.push(value);
    renderIngredients(listElem);
    inputElem.value = "";
  }
}

// 食材一覧再描画
function renderIngredients(listElem) {
  listElem.innerHTML = "";
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      ingredients.splice(index, 1);
      renderIngredients(listElem);
    });
    li.appendChild(removeBtn);
    listElem.appendChild(li);
  });
}

// フォームからデータ収集
function gatherRequestData() {
  const genreElems = document.querySelectorAll(".option-block:nth-of-type(1) input[type='checkbox']:checked");
  const methodElems = document.querySelectorAll(".option-block:nth-of-type(2) input[type='checkbox']:checked");
  const toolsElems = document.querySelectorAll(".option-block:nth-of-type(4) input[type='checkbox']:checked");
  const tasteElems = document.querySelectorAll(".option-block:nth-of-type(5) input[type='checkbox']:checked");
  const usageElems = document.querySelectorAll(".option-block:nth-of-type(6) input[type='checkbox']:checked");

  const cookingTimeInput = document.getElementById("cookingTimeInput");
  const calorieLimitInput = document.getElementById("calorieLimitInput");
  const additionalRequestInput = document.getElementById("additionalRequestInput");

  return {
    食材: ingredients,
    料理ジャンル: Array.from(genreElems).map((elem) => elem.value),
    調理法: Array.from(methodElems).map((elem) => elem.value),
    調理時間: cookingTimeInput.value.trim(),
    使用する調理器具: Array.from(toolsElems).map((elem) => elem.value),
    味の好み: Array.from(tasteElems).map((elem) => elem.value),
    料理の用途: Array.from(usageElems).map((elem) => elem.value),
    カロリー制限: calorieLimitInput.value.trim(),
    追加リクエスト: additionalRequestInput.value.trim(),
  };
}

// Glitchサーバーに送信
async function generateRecipe(requestData) {
  const apiUrl = "https://adventurous-ash-tabletop.glitch.me/api/recipe";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    throw new Error("Glitch API Error");
  }

  const data = await response.json();
  return data.recipe;
}

// 画面にレシピ表示
function displayRecipe(recipeText) {
  const recipeResult = document.getElementById("recipeResult");

  try {
    const recipeJson = JSON.parse(recipeText);

    const html = `
      <article class="recipe-card">
        <h3 class="recipe-title">${recipeJson["レシピタイトル"]}</h3>
        <section>
          <h4 class="section-title">材料</h4>
          <ul class="ingredients">
            ${recipeJson["材料"]
              .map(item => `<li>${item["食材"]}：${item["量"]}</li>`)
              .join("")}
          </ul>
        </section>
        <section>
          <h4 class="section-title">作り方</h4>
          <ol class="steps">
            ${recipeJson["作り方"]
              .map(step => `<li>${step}</li>`)
              .join("")}
          </ol>
        </section>
        <section class="info">
          <p><strong>所要時間：</strong> ${recipeJson["調理時間"]}</p>
          <p><strong>カロリー：</strong> ${recipeJson["カロリー"]}</p>
        </section>
      </article>
    `;

    recipeResult.innerHTML = html;
  } catch (e) {
    recipeResult.textContent = recipeText;
  }
}
