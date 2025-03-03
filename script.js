document.addEventListener("DOMContentLoaded", function () {
    // 食材をリストに追加
    function addIngredient() {
        let input = document.getElementById("ingredientInput");
        let ingredient = input.value.trim(); // 空白を除去

        if (ingredient === "") return; // 何も入力されていない場合は処理しない

        let list = document.getElementById("ingredientList");

        // リストアイテムを作成
        let listItem = document.createElement("li");
        listItem.textContent = ingredient + " ";

        // 削除ボタンを作成
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.style.marginLeft = "10px"; // 削除ボタンに余白をつける
        deleteBtn.onclick = function () {
            list.removeChild(listItem);
        };

        listItem.appendChild(deleteBtn); // リストアイテムに削除ボタンを追加
        list.appendChild(listItem); // リストに追加

        input.value = ""; // 入力欄をリセット
    }

    document.querySelector("button[onclick='addIngredient()']").addEventListener("click", addIngredient);

    // レシピ作成ボタンが押されたときの処理
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

        console.log("選択された食材:", selectedIngredients);
        console.log("選択された料理ジャンル:", selectedCuisine);
        console.log("選択された調理法:", selectedMethods);
    });
});
