// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use base64::Engine;
use serde_json::Value;

async fn get_token(id: String, secret: String) -> Result<Value, reqwest::Error> {
    Ok(reqwest::Client::new()
        .post("https://www.reddit.com/api/v1/access_token")
        .header(
            "Authorization",
            format!(
                "Basic {}",
                base64::engine::general_purpose::STANDARD
                    .encode(format!("{}:{}", id, secret).as_bytes())
            ),
        )
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("User-Agent", "ChangeMeClient/0.1 by YourUsername")
        .body("grant_type=client_credentials")
        .send()
        .await?
        .json::<Value>()
        .await?
        .get("access_token")
        .unwrap()
        .clone())
}

#[tauri::command]
async fn token(id: String, secret: String) -> Value {
    if let Ok(token) = get_token(id, secret).await {
        return token;
    }
    Value::Null
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
