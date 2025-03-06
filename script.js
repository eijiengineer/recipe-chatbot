/******************************************************
 * 料理チャットボット フロントエンドサンプル
 * 
 * 必要に応じて下記の点をカスタマイズしてください。
 *  - OpenAI API の呼び出し部分（fetch のエンドポイント、ヘッダー等）
 *  - レスポンスのデータ解析方法
 ******************************************************/

// 食材リストを管理
let ingredients = [];

// ページが読み込まれたらイベントを設定
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

  // 詳細オプションの表示/非表示切り替え
  toggleOptionsBtn.addEventListener("click", () => {
    optionsContainer.classList.toggle("collapsed");
    toggleOptionsBtn.textContent = optionsContainer.classList.contains("collapsed")
      ? "詳細オプションを表示"
      : "詳細オプションを隠す";
  });

  // レシピ作成ボタン
  createRecipeBtn.addEventListener("click", () => {
    const requestData = gatherRequestData();
    console.log("■ 送信データ（デバッグ用）:", requestData);

    // ここからAPI呼び出し（ChatGPT等）を行う
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

/**
 * 食材を追加する関数
 */
function addIngredient(inputElem, listElem) {
  const value = inputElem.value.trim();
  if (value) {
    ingredients.push(value);
    renderIngredients(listElem);
    inputElem.value = "";
  }
}

/**
 * 食材一覧を再描画する
 */
function renderIngredients(listElem) {
  listElem.innerHTML = "";
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    // 削除ボタン
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

/**
 * 画面からデータを収集し、JSON形式に整形する
 */
function gatherRequestData() {
  // 料理ジャンル
  const genreElems = document.querySelectorAll(
    ".option-block:nth-of-type(1) input[type='checkbox']:checked"
  );
  const genreValues = Array.from(genreElems).map((elem) => elem.value);

  // 調理法
  const methodElems = document.querySelectorAll(
    ".option-block:nth-of-type(2) input[type='checkbox']:checked"
  );
  const methodValues = Array.from(methodElems).map((elem) => elem.value);

  // 調理時間
  const cookingTimeInput = document.getElementById("cookingTimeInput");
  const cookingTimeValue = cookingTimeInput.value.trim();

  // 使用する調理器具
  const toolsElems = document.querySelectorAll(
    ".option-block:nth-of-type(4) input[type='checkbox']:checked"
  );
  const toolsValues = Array.from(toolsElems).map((elem) => elem.value);

  // 味の好み
  const tasteElems = document.querySelectorAll(
    ".option-block:nth-of-type(5) input[type='checkbox']:checked"
  );
  const tasteValues = Array.from(tasteElems).map((elem) => elem.value);

  // 料理の用途
  const usageElems = document.querySelectorAll(
    ".option-block:nth-of-type(6) input[type='checkbox']:checked"
  );
  const usageValues = Array.from(usageElems).map((elem) => elem.value);

  // カロリー制限
  const calorieLimitInput = document.getElementById("calorieLimitInput");
  const calorieLimitValue = calorieLimitInput.value.trim();

  // 追加リクエスト
  const additionalRequestInput = document.getElementById("additionalRequestInput");
  const additionalRequestValue = additionalRequestInput.value.trim();

  // JSONデータにまとめる
  const requestData = {
    食材: ingredients,
    料理ジャンル: genreValues,
    調理法: methodValues,
    調理時間: cookingTimeValue,
    使用する調理器具: toolsValues,
    味の好み: tasteValues,
    料理の用途: usageValues,
    カロリー制限: calorieLimitValue,
    追加リクエスト: additionalRequestValue,
  };

  return requestData;
}

/**
 * ChatGPT APIを呼び出してレシピを生成する
 * ※ 実際に動かすには、OpenAIのAPIキーやエンドポイントを正しく設定してください。
 */
async function generateRecipe(requestData) {
  // 例: OpenAI APIを呼び出す場合
  // プロンプトを作成
  const promptText = createPromptFromData(requestData);

  // API呼び出し
  // ここではダミーの fetch を書いています。実際にはご自身のバックエンドや
  // 直接 OpenAI API を呼び出す等、環境に合わせて修正してください。
  const apiUrl = "https://api.openai.com/v1/chat/completions"; // エンドポイント(例)
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer YOUR_OPENAI_API_KEY_HERE" // 実際のAPIキーを設定
      Authorization: `Bearer YOUR_OPENAI_API_KEY_HERE`, // 例
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // 適宜変更
      messages: [
        {
          role: "system",
          content: "あなたは優秀な料理アシスタントです。",
        },
        {
          role: "user",
          content: promptText,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API Error");
  }

  const data = await response.json();
  // ChatGPTからの返信テキストを取得
  const recipeText = data.choices[0].message.content;

  // 本来は JSON っぽく解析するためのプロンプトを組んだほうが良いですが、
  // ここではシンプルに文字列を返すケースを想定
  // 受け取ったテキストをそのまま返すか、パースする場合は適宜行ってください。
  return recipeText;
}

/**
 * リクエストデータからプロンプト文を作成（簡易版）
 */
function createPromptFromData(requestData) {
  // 実際には、より詳細な形式でプロンプトを作成するとより良い結果が得られます。
  // ここではサンプルとしてシンプルな文章を組み立てています。
  let prompt = `以下の条件に合うレシピを1つ提案してください。\n`;

  prompt += `【食材】: ${requestData.食材.join(", ") || "指定なし"}\n`;
  prompt += `【料理ジャンル】: ${requestData.料理ジャンル.join(", ") || "指定なし"}\n`;
  prompt += `【調理法】: ${requestData.調理法.join(", ") || "指定なし"}\n`;
  prompt += `【調理時間】: ${requestData.調理時間 ? requestData.調理時間 + "分以内" : "指定なし"}\n`;
  prompt += `【使用する調理器具】: ${requestData.使用する調理器具.join(", ") || "指定なし"}\n`;
  prompt += `【味の好み】: ${requestData.味の好み.join(", ") || "指定なし"}\n`;
  prompt += `【料理の用途】: ${requestData.料理の用途.join(", ") || "指定なし"}\n`;
  prompt += `【カロリー制限】: ${requestData.カロリー制限 ? requestData.カロリー制限 + "kcal以下" : "指定なし"}\n`;
  prompt += `【追加リクエスト】: ${requestData.追加リクエスト || "特になし"}\n`;

  prompt += `\n出力は、以下の形式のJSONで返してください。\n`;
  prompt += `{
  "レシピタイトル": "タイトル",
  "材料": [
    {"食材": "○○", "量": "適量"}
  ],
  "作り方": [
    "ステップ1",
    "ステップ2"
  ],
  "調理時間": "XX分",
  "カロリー": "XXXkcal"
}\n`;
  
  return prompt;
}

/**
 * 生成されたレシピを画面に表示
 */
function displayRecipe(recipeText) {
  const recipeResult = document.getElementById("recipeResult");
  
  // もしレシピがJSON形式で返ってきた場合はJSONをパースして表示など
  // 今回はシンプルに文字列をそのまま表示
  recipeResult.textContent = recipeText;
}
