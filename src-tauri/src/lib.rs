// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use base64::Engine;
use serde_json::Value;

#[tauri::command]
async fn auth(id: String, secret: String, code: String) -> Value {
    let result = reqwest::Client::new()
        .post("https://www.reddit.com/api/v1/access_token")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("User-Agent", "Rocket/1.0 by Dosx001")
        .header(
            "Authorization",
            format!(
                "Basic {}",
                base64::engine::general_purpose::STANDARD
                    .encode(format!("{}:{}", id, secret).as_bytes())
            ),
        )
        .body(format!(
            "grant_type=authorization_code&code={}&redirect_uri=http://localhost:1420",
            code
        ))
        .send()
        .await;
    match result {
        Ok(response) => match response.json::<Value>().await {
            Ok(value) => value,
            Err(_) => Value::Null,
        },
        Err(_) => Value::Null,
    }
}

#[tauri::command]
async fn hot(token: String, after: String) -> Value {
    let result = reqwest::Client::new()
        .get(format!("https://oauth.reddit.com/hot/?after={}", after))
        .header("Authorization", format!("bearer {}", token))
        .header("User-Agent", "Rocket/1.0 by Dosx001")
        .send()
        .await;
    match result {
        Ok(response) => match response.json::<Value>().await {
            Ok(value) => value,
            Err(_) => Value::Null,
        },
        Err(_) => Value::Null,
    }
}

#[tauri::command]
async fn token(id: String, secret: String) -> Value {
    let result = reqwest::Client::new()
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
        .header("User-Agent", "Rocket/1.0 by Dosx001")
        .body("grant_type=client_credentials")
        .send()
        .await;
    match result {
        Ok(response) => match response.json::<Value>().await {
            Ok(value) => {
                if let Some(token) = value.get("access_token") {
                    return token.clone();
                }
            }
            Err(_) => return Value::Null,
        },
        Err(_) => return Value::Null,
    }
    Value::Null
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![auth, hot, token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
