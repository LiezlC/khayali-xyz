use tauri::Manager;

#[tauri::command]
async fn process_files(paths: Vec<String>) -> String {
    use std::process::Command;
    let output = Command::new("python")
        .arg("backend/wisdom_agent.py")
        .args(&paths)
        .output()
        .expect("Failed to execute Python script");

    String::from_utf8_lossy(&output.stdout).to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![process_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}