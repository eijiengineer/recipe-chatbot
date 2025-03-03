document.addEventListener("DOMContentLoaded", function () {
    // 食材をリストに追加
    function addIngredient() {
        let input = document.getElementById("ingredientInput");
        let ingredient = input.value.trim();

        if (ingredient === "") return;

        let list = document.getElementById("ingredientList");

        let listItem = document.createElement("li");
        listItem.textContent = ingredient + " ";

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            list.removeChild(listItem);
        };

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);

        input.value = "";
    }

    document.querySelector("button[onclick='addIngredient()']").addEventListener("click", addIngredient);

    // レシピ作成ボタンの処理
    document.getElementById("generateRecipe").addEventListener("click", function () {
        let selectedIngredients = [];
        document.querySelectorAll("#ingredientList li").forEach((item) => {
            selectedIngredients.push(item.textContent.replace(" 🗑️", "").trim());
        });

        let selectedCuisine = document.getElementById("cuisine").value;

        let selectedMethods = [];
        document.querySelectorAll('input[name="method"]:checked').forEach((checkbox) => {
            selectedMethods.push(checkbox.value);
        });

        let cookTime = document.getElementById("cookTime").value;

        let selectedDiets = [];
        document.querySelectorAll('input[name="diet"]:checked').forEach((checkbox) => {
            selectedDiets.push(checkbox.value);
        });

        let isHealthy = document.getElementById("healthyOption").checked;

        let calorieLimit = document.getElementById("calorieLimit").value;

        console.log("選択された食材:", selectedIngredients);
        console.log("選択された料理ジャンル:", selectedCuisine);
        console.log("選択された調理法:", selectedMethods);
        console.log("調理時間:", cookTime, "分");
        console.log("食事制限:", selectedDiets);
        console.log("ヘルシー志向:", isHealthy ? "はい" : "いいえ");
        console.log("カロリー制限:", calorieLimit, "kcal 以下");
    });
});
