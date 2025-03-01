function addIngredient() {
    let input = document.getElementById("ingredientInput");
    let ingredient = input.value.trim(); // 入力値を取得

    if (ingredient === "") return; // 空欄の場合は何もしない

    let list = document.getElementById("ingredientList");

    // リストアイテムを作成
    let listItem = document.createElement("li");
    listItem.textContent = ingredient;

    // 削除ボタンを追加
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = function () {
        list.removeChild(listItem);
    };

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    input.value = ""; // 入力欄をリセット
}
