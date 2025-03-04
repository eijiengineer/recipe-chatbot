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

function addIngredient() {
    const input = document.getElementById("ingredientInput");
    const list = document.getElementById("ingredientList");

    if (input.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = input.value;
        list.appendChild(listItem);
        input.value = "";
    }
}

// 🟢 ユーザーの入力データを JSON に変換
function generateRecipe() {
    const ingredients = [];
    document.querySelectorAll("#ingredientList li").forEach(item => {
        ingredients.push(item.textContent);
    });

    // 料理のジャンル（チェックボックス）
    const selectedGenres = getCheckedValues("料理ジャンル");
    // 調理法
    const selectedMethods = getCheckedValues("調理法");

    // 🛠 エラー回避のため、nullチェックを追加
    const cookTimeInput = document.getElementById("cookTime");
    const cookTime = cookTimeInput ? cookTimeInput.value : null;

    const calorieLimitInput = document.getElementById("calorieLimit");
    const calorieLimit = calorieLimitInput ? calorieLimitInput.value : null;

    // 料理の種類
    const selectedTypes = getCheckedValues("料理の種類");
    // 使用する調理器具
    const selectedTools = getCheckedValues("使用する調理器具");
    // 味の好み
    const selectedTastes = getCheckedValues("味の好み");
    // 料理の用途
    const selectedUses = getCheckedValues("料理の用途");
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

// 🟢 チェックボックスの値を取得する関数
function getCheckedValues(sectionClass) {
    const values = [];
    document.querySelectorAll(`.${sectionClass} input[type="checkbox"]:checked`)
        .forEach(input => values.push(input.value));
    return values;
}
