document.addEventListener("DOMContentLoaded", function () {
    // 🟢 食材の追加機能（Enterキー or ボタン）
    const ingredientInput = document.getElementById("ingredientInput");
    const ingredientList = document.getElementById("ingredientList");
    const addIngredientBtn = document.getElementById("addIngredientBtn");
    const generateRecipeBtn = document.getElementById("generateRecipe");

    // 🟢 エンターキーでも食材を追加
    ingredientInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addIngredient();
        }
    });

    // 🟢 追加ボタンでも食材を追加
    addIngredientBtn.addEventListener("click", addIngredient);

    // 🟢 レシピ作成ボタン
    generateRecipeBtn.addEventListener("click", generateRecipe);
});

// 🟢 食材を追加する処理（削除ボタン付き）
function addIngredient() {
    const input = document.getElementById("ingredientInput");
    const list = document.getElementById("ingredientList");

    if (input.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = input.value;

        // 🔘 削除ボタンを追加
        const removeButton = document.createElement("button");
        removeButton.textContent = "×";
        removeButton.classList.add("remove-btn");
        removeButton.onclick = function () {
            list.removeChild(listItem);
        };

        listItem.appendChild(removeButton);
        list.appendChild(listItem);
        input.value = "";
    }
}

// 🟢 ユーザーの入力データを JSON に変換
function generateRecipe() {
    const ingredients = [];
    document.querySelectorAll("#ingredientList li").forEach(item => {
        ingredients.push(item.childNodes[0].nodeValue.trim());
    });

    // ✅ チェックボックスの値を取得
    const selectedGenres = getCheckedValues("genre-checkbox");
    const selectedMethods = getCheckedValues("method-checkbox");

    // 調理時間
    const cookTime = document.getElementById("cookTime").value;

    // 追加リクエスト
    const customRequest = document.getElementById("customRequest").value.trim();

    // JSON データを作成
    const requestData = {
        "食材": ingredients,
        "料理ジャンル": selectedGenres,
        "調理法": selectedMethods,
        "調理時間": cookTime,
        "追加リクエスト": customRequest
    };

    // 🔥 JSON データを表示
    document.getElementById("output").textContent = JSON.stringify(requestData, null, 2);
}

// ✅ チェックボックスの値を取得
function getCheckedValues(className) {
    return Array.from(document.querySelectorAll(`.${className}:checked`)).map(input => input.value);
}
