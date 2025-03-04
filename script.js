document.addEventListener("DOMContentLoaded", function () {
    // 🟢 食材の追加機能（Enterキー or ボタン）
    const ingredientInput = document.getElementById("ingredientInput");
    const ingredientList = document.getElementById("ingredientList");

    ingredientInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addIngredient();
        }
    });

    document.getElementById("generateRecipe").addEventListener("click", function () {
        generateRecipe();
    });

    // ✅ ボタン風チェックボックスの動作を修正（クリックで選択/解除）
    document.querySelectorAll(".checkbox-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("selected");
        });
    });
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
        // 🔘 削除ボタンがあるので、食材のテキスト部分だけを取得
        ingredients.push(item.childNodes[0].nodeValue.trim());
    });

    // ✅ ボタン風チェックボックスが選択されているか確認
    const selectedGenres = getSelectedCheckboxValues("genre-checkbox");
    const selectedMethods = getSelectedCheckboxValues("method-checkbox");
    const selectedTypes = getSelectedCheckboxValues("type-checkbox");
    const selectedTools = getSelectedCheckboxValues("tool-checkbox");
    const selectedTastes = getSelectedCheckboxValues("taste-checkbox");
    const selectedUses = getSelectedCheckboxValues("use-checkbox");

    // 調理時間とカロリー制限
    const cookTime = document.getElementById("cookTime") ? document.getElementById("cookTime").value : null;
    const calorieLimit = document.getElementById("calorieLimit") ? document.getElementById("calorieLimit").value : null;

    // 追加リクエスト
    const customRequest = document.getElementById("customRequest") ? document.getElementById("customRequest").value.trim() : "";

    // JSON データを作成
    const requestData = {
        "食材": ingredients,
        "料理ジャンル": selectedGenres,
        "調理法": selectedMethods,
        "調理時間": cookTime,
        "カロリー制限": calorieLimit,
        "料理の種類": selectedTypes,
        "使用する調理器具": selectedTools,
        "味の好み": selectedTastes,
        "料理の用途": selectedUses,
        "追加リクエスト": customRequest
    };

    // コンソールで確認（APIに送る前にチェック）
    console.log("生成された JSON データ:", JSON.stringify(requestData, null, 2));
}

// 🟢 ✅ ボタン風のチェックボックスから選択値を取得
function getSelectedCheckboxValues(className) {
    const values = [];
    document.querySelectorAll(`.${className}.selected`).forEach(button => {
        values.push(button.textContent.trim());
    });
    return values;
}
