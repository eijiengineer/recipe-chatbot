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

    // 料理のジャンル（チェックボックス）
    const selectedGenres = getCheckedValues("genre-checkbox");
    // 調理法
    const selectedMethods = getCheckedValues("method-checkbox");
    // 調理時間
    const cookTime = document.getElementById("cookTime") ? document.getElementById("cookTime").value : null;
    // カロリー制限
    const calorieLimit = document.getElementById("calorieLimit") ? document.getElementById("calorieLimit").value : null;
    // 料理の種類
    const selectedTypes = getCheckedValues("type-checkbox");
    // 使用する調理器具
    const selectedTools = getCheckedValues("tool-checkbox");
    // 味の好み
    const selectedTastes = getCheckedValues("taste-checkbox");
    // 料理の用途
    const selectedUses = getCheckedValues("use-checkbox");
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

// 🟢 チェックボックスの値を取得する関数（選択できるよう修正）
function getCheckedValues(className) {
    const values = [];
    document.querySelectorAll(`.${className} input[type="checkbox"]:checked`)
        .forEach(input => values.push(input.value));
    return values;
}
