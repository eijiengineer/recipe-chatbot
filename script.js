document.addEventListener("DOMContentLoaded", function () {
    // ✅ チェックボックス用データを定義
    const options = {
        genre: ["和食", "洋食", "中華", "韓国料理", "エスニック", "イタリアン", "フレンチ"],
        method: ["炒める", "煮る", "蒸す", "焼く", "揚げる", "茹でる", "生（火を使わない）"],
        tool: ["フライパン", "電子レンジ", "オーブン", "炊飯器", "蒸し器", "圧力鍋", "ホットプレート"],
        taste: ["甘い", "辛い", "酸っぱい", "さっぱり", "こってり", "スパイシー"]
    };

    // ✅ チェックボックスを動的に生成
    for (const category in options) {
        const container = document.getElementById(`${category}-options`);
        options[category].forEach(option => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" class="${category}-checkbox" value="${option}"> ${option}`;
            container.appendChild(label);
        });
    }

    // ✅ 食材の追加
    document.getElementById("addIngredientBtn").addEventListener("click", addIngredient);
    document.getElementById("ingredientInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") addIngredient();
    });

    // ✅ レシピ作成ボタン
    document.getElementById("generateRecipe").addEventListener("click", generateRecipe);

    // ✅ オプションの折りたたみ機能
    document.getElementById("toggleOptions").addEventListener("click", function () {
        const container = document.getElementById("optionsContainer");
        container.classList.toggle("hidden");
        this.textContent = container.classList.contains("hidden") ? "＋ オプションを表示" : "− オプションを隠す";
    });
});

// 🟢 食材を追加する
function addIngredient() {
    const input = document.getElementById("ingredientInput");
    const list = document.getElementById("ingredientList");

    if (input.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = input.value;
        const removeButton = document.createElement("button");
        removeButton.textContent = "×";
        removeButton.onclick = function () {
            list.removeChild(listItem);
        };
        listItem.appendChild(removeButton);
        list.appendChild(listItem);
        input.value = "";
    }
}

// 🟢 JSONを作成して表示
function generateRecipe() {
    const ingredients = Array.from(document.querySelectorAll("#ingredientList li")).map(item => item.textContent.replace("×", "").trim());

    const requestData = {
        "食材": ingredients,
        "料理ジャンル": getCheckedValues("genre-checkbox"),
        "調理法": getCheckedValues("method-checkbox"),
        "調理時間": document.getElementById("cookTime").value,
        "使用する調理器具": getCheckedValues("tool-checkbox"),
        "味の好み": getCheckedValues("taste-checkbox"),
        "カロリー制限": document.getElementById("calorieLimit").value,
        "追加リクエスト": document.getElementById("customRequest").value.trim()
    };

    document.getElementById("output").textContent = JSON.stringify(requestData, null, 2);
}

// ✅ 選択されたチェックボックスの値を取得
function getCheckedValues(className) {
    return Array.from(document.querySelectorAll(`.${className}:checked`)).map(input => input.value);
}
