// 「クリックしてみる！」ボタンを押したときのメッセージ表示
function showMessage() {
    document.getElementById("message").innerText = "ボタンが押されました！";
}

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
